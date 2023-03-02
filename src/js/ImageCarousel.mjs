export default class ImageCarousel {
  /**
   * ImageCarousel is reponsible for keeping track of what slide is shown and
   * changing to a new slide when requested.
   */
  constructor() {
    this.slideIndex = 1;
    document
      .querySelector(".carousel-container")
      .addEventListener("click", (e) => this.carouselMan(e));
  }

  /**
   * Display the slide of given index.
   */
  showSlides() {
    // Slideshow code modified from https://www.w3schools.com/howto/howto_js_slideshow.asp
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (this.slideIndex > slides.length) {
      this.slideIndex = 1;
    }
    if (this.slideIndex < 1) {
      this.slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  }

  setIndex(index) {
    this.slideIndex = index;
  }

  carouselMan(e) {
    let action = e.target.dataset.action;
    let index = +e.target.dataset.index;
    switch (action) {
      case "slide":
        this.slideIndex += index;
        this.showSlides();
        break;

      case "change":
        this.slideIndex = index + 1;
        this.showSlides();
        break;

      default:
        break;
    }
  }
}
