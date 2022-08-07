export class Keyboard {
  #switchEl;
  #fontSelect;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#containerEl = document.getElementById("container");
    // getElementById는 doucument에서만 동작함
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelect = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelect.addEventListener("change", this.#onChangeFont);
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener("mousedown", this.#onMouseDown);

    // 키보드에 포커스되어 있지 않아도 키 입력을 인식할 수 있도록 다큐먼트단에 이벤트 걸어주기
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onChangeTheme(event) {
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }

  #onKeyDown(event) {
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/.test(event.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.add("active");
  }

  #onKeyUp(event) {
    this.#keyboardEl
      .querySelector(`[data-code=${event.code}]`)
      ?.classList.remove("active");
  }

  #onInput(event) {
    console.log(event.target.value);
    event.target.value = event.target.value.replace(
      /[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/,
      ""
    );
  }

  #onMouseDown(event) {
    event.target.closest("div.key")?.classList.add("active");
  }

  #onMouseUp(event) {
    const keyEl = event.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;

    if (isActive && !!val && val !== "Space" && val !== "Backspace") {
      this.#inputEl.value += val;
    }

    if (isActive && val === "Space") {
      this.#inputEl.value += " ";
    }

    if (isActive && val === "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }

    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }
}
