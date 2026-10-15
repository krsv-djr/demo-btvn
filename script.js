// 1. MỞ / ĐÓNG MENU TRÊN ĐIỆN THOẠI
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");   // thêm/bớt class "open"
  menuBtn.setAttribute("aria-expanded", isOpen); // báo cho trình đọc màn hình
});

// Bấm vào một liên kết thì đóng menu lại
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// 2. LỌC TIN TỨC THEO ĐỐI TƯỢNG
const tabs = document.querySelectorAll(".tab");
const newsItems = document.querySelectorAll(".news li");

function filterNews(group) {
  // Tô đậm nút đang chọn
  tabs.forEach((tab) => tab.setAttribute("aria-pressed", tab.dataset.filter === group));
  // Ẩn tin không thuộc nhóm được chọn
  newsItems.forEach((item) => {
    const groups = item.dataset.for.split(" ");
    item.hidden = !(group === "tat-ca" || groups.includes(group));
  });
}

tabs.forEach((tab) => tab.addEventListener("click", () => filterNews(tab.dataset.filter)));

// Ba ô "Học sinh / Giáo viên / Phụ huynh" ở banner cũng lọc tin
document.querySelectorAll(".audience a").forEach((link) => {
  link.addEventListener("click", () => filterNews(link.dataset.filter));
});

// 3. KIỂM TRA BIỂU MẪU LIÊN HỆ
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // không tải lại trang
  let allValid = true;

  form.querySelectorAll("[required]").forEach((field) => {
    const error = field.parentElement.querySelector(".error");
    let message = "";
    if (!field.value.trim()) message = "Vui lòng điền thông tin này.";
    else if (!field.checkValidity()) message = "Thông tin chưa đúng định dạng.";
    error.textContent = message;
    if (message) allValid = false;
  });

  if (allValid) {
    // Bản thử chưa có máy chủ nên tin nhắn chưa được gửi đi đâu cả
    status.textContent = "Cảm ơn bạn! Biểu mẫu hợp lệ (bản thử, chưa gửi đi đâu).";
    form.reset();
  } else {
    status.textContent = "";
  }
});

// 4. TỰ ĐỘNG CẬP NHẬT NĂM Ở CHÂN TRANG
document.getElementById("year").textContent = new Date().getFullYear();
