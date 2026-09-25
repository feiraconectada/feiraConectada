(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".main-nav");

  menuButton?.addEventListener("click", () => {
    const isOpen = menu?.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu",
    );
  });

  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      menu?.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const normalize = (value) =>
    (value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  function initFiltering({
    group,
    inputSelector,
    gridSelector,
    countSelector,
    emptySelector,
  }) {
    const buttons = [
      ...document.querySelectorAll(
        `[data-filter-group="${group}"] .filter-pill`,
      ),
    ];
    const input = document.querySelector(inputSelector);
    const grid = document.querySelector(gridSelector);
    if (!grid || !buttons.length) return;

    const items = [...grid.querySelectorAll(".filterable")];
    const count = document.querySelector(countSelector);
    const empty = document.querySelector(emptySelector);
    let activeCategory = "Todos";

    const apply = () => {
      const query = normalize(input?.value);
      let visible = 0;

      items.forEach((item) => {
        const matchesCategory =
          activeCategory === "Todos" ||
          normalize(item.dataset.category) === normalize(activeCategory);
        const matchesQuery =
          !query || normalize(item.dataset.search).includes(query);
        const show = matchesCategory && matchesQuery;
        item.classList.toggle("is-hidden", !show);
        if (show) visible += 1;
      });

      if (count) count.textContent = String(visible);
      if (empty) empty.hidden = visible !== 0;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activeCategory = button.dataset.filter || "Todos";
        buttons.forEach((item) =>
          item.classList.toggle("active", item === button),
        );
        apply();
      });
    });

    input?.addEventListener("input", apply);

    const params = new URLSearchParams(window.location.search);
    const requested = params.get("categoria");
    if (requested) {
      const matching = buttons.find(
        (button) => normalize(button.dataset.filter) === normalize(requested),
      );
      if (matching) matching.click();
      else apply();
    } else {
      apply();
    }
  }

  initFiltering({
    group: "producers",
    inputSelector: "#producer-search",
    gridSelector: "#producer-grid",
    countSelector: "#producer-count",
    emptySelector: "#producer-empty",
  });

  initFiltering({
    group: "products",
    inputSelector: "#product-search",
    gridSelector: "#product-grid",
    countSelector: "#product-count",
    emptySelector: "#product-empty",
  });

  // ==========================================================
  // CADASTRO — validação + envio via FormSubmit
  // Destino: feiraconectadanh@gmail.com
  //
  // IMPORTANTE:
  // O envio é feito pelo POST normal do formulário (sem fetch/AJAX).
  // Isso deixa a ativação inicial do FormSubmit e o reCAPTCHA funcionarem
  // de forma mais confiável. A página precisa estar aberta por http/https,
  // por exemplo com Live Server, e não diretamente por file://.
  // ==========================================================
  const form = document.querySelector("#signup-form");
  if (form) {
    const status = document.querySelector("#form-status");
    const submitButton = form.querySelector(".submit-btn");
    const nextInput = document.querySelector("#form-next");
    const urlInput = document.querySelector("#form-url");

    const setStatus = (message, type = "") => {
      if (!status) return;
      status.textContent = message;
      status.classList.remove("error", "success");
      if (type) status.classList.add(type);
    };

    // Quando o FormSubmit redirecionar de volta para a página,
    // mostramos a confirmação e limpamos o parâmetro da URL.
    const pageParams = new URLSearchParams(window.location.search);
    if (pageParams.get("enviado") === "1") {
      setStatus(
        "Dados enviados com sucesso! Nossa equipe entrará em contato.",
        "success",
      );
      pageParams.delete("enviado");
      const cleanQuery = pageParams.toString();
      const cleanUrl = `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", cleanUrl);
    }

    form.addEventListener("submit", (event) => {
      let valid = true;

      const fields = [...form.querySelectorAll("input[required]")];
      fields.forEach((input) => {
        const error = input.parentElement?.querySelector(".field-error");
        let message = "";

        if (!input.value.trim()) {
          message = "Preencha este campo.";
        } else if (
          input.type === "email" &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
        ) {
          message = "Informe um e-mail válido.";
        } else if (
          input.name === "telefone" &&
          input.value.replace(/\D/g, "").length < 10
        ) {
          message = "Informe um telefone com DDD.";
        } else if (input.name === "nome" && input.value.trim().length < 3) {
          message = "Informe seu nome completo.";
        }

        input.classList.toggle("invalid", Boolean(message));
        if (error) error.textContent = message;
        if (message) valid = false;
      });

      if (!valid) {
        event.preventDefault();
        setStatus("Revise os campos destacados.", "error");
        return;
      }

      // O FormSubmit não funciona corretamente quando a página é aberta
      // diretamente como arquivo (file://...). Use um servidor local.
      if (window.location.protocol === "file:") {
        event.preventDefault();
        setStatus(
          "Para enviar o cadastro, abra o projeto pelo Live Server ou outro servidor local (http://localhost), e não diretamente pelo arquivo HTML.",
          "error",
        );
        return;
      }

      // Informamos ao FormSubmit qual é a página de origem e para onde
      // retornar depois de um envio concluído.
      const currentUrl = new URL(window.location.href);
      currentUrl.search = "";
      currentUrl.hash = "";

      const nextUrl = new URL(currentUrl.href);
      nextUrl.searchParams.set("enviado", "1");

      if (urlInput) urlInput.value = currentUrl.href;
      if (nextInput) nextInput.value = nextUrl.href;

      setStatus("Enviando cadastro...");
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Enviando...";
      }

      // NÃO usamos preventDefault aqui: o navegador faz o POST normal
      // para o FormSubmit. Na primeira utilização, o endereço de destino
      // receberá o e-mail de ativação do formulário.
    });
  }
})();
