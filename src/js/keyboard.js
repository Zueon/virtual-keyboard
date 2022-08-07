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

    // 키보드에 포커스되어 있지 않아도 키 입력을 인식할 수 있도록 다큐먼트단에 이벤트 걸어주기
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));

    this.#inputEl.addEventListener("input", (event) => {
      console.log(event.target.value);
      this.#inputEl.value = this.#inputEl.value.replace(
        /[ㄱ-ㅎ | ㅏ-ㅣ | 가-힣]/,
        ""
      );
    });
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
}
