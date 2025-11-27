## Pinwheel Landing Page (HTML5 + TailwindCSS)

Dự án này tái tạo giao diện https://capstone-tailwind1.vercel.app bằng HTML thuần, TailwindCSS và JavaScript thuần, đảm bảo giống 100% về bố cục, màu sắc, chuyển động và responsive.

---

### 1. Công nghệ & thư viện
- **HTML5**: markup tĩnh, phân rã thành component để dễ quản lý.
- **TailwindCSS 3.4**: hệ thống utility class chính, build với PostCSS + Autoprefixer.
- **JavaScript thuần**: nạp component động, xử lý dropdown, tab, video overlay, carousel testimonial, animation khi cuộn.
- **http-server (dev preview)**: phục vụ nhanh trang tĩnh trong quá trình kiểm tra.

Skript npm:
```bash
npm run dev     # build CSS và watch thay đổi
npm run build   # build CSS minify cho production
npm run preview # mở http-server để xem demo
```

---

### 2. Cấu trúc thư mục
```
/public
  /assets
    /images          # toàn bộ hình ảnh, icon SVG
  /css
    main.css         # file Tailwind build
  /js
    app.js           # logic nạp component + tương tác
/src
  /css
    tailwind.css     # khai báo @tailwind + lớp tùy biến
  /components
    *.html           # navbar, hero, features, services, ...
tailwind.config.js   # extend theme, animation, container
postcss.config.js    # tailwindcss + autoprefixer
index.html           # skeleton trang + loader component
package.json         # scripts, dependencies
```

---

### 3. Luồng render & layout
1. **`index.html`** chỉ chứa các placeholder `data-component`.
2. **`public/js/app.js`** fetch từng file trong `src/components` và chèn vào DOM → gom cấu trúc nhưng vẫn HTML thuần.
3. Tailwind được build từ `src/css/tailwind.css`, trong đó:
   - `@layer base`: reset, font, spacing section.
   - `@layer components`: class tuỳ biến (`btn`, `feature-card`, `tab-button`, `review-card`...).
4. `tailwind.config.js` mở rộng:
   - `container`: canh giữa với padding chuẩn theo breakpoint.
   - `colors`: primary #FE6019, charcoal, border, theme-light/dark.
   - `fontFamily`: *Poppins* (body) và *Merriweather* (heading).
   - `boxShadow`, `backgroundImage`, `borderRadius` cho CTA/hero.
   - `animation`: `fade-up`, `float` để mô phỏng motion bản gốc.

---

### 4. Thành phần chính
- `navbar.html`: sticky header, menu mobile toggle, dropdown “Pages”.
- `hero.html`: banner trái văn bản, phải hình, kèm badge + button gradient.
- `features.html`: lưới 10 cards, icon SVG chuẩn, layout responsive 2-4 cột.
- `services.html`: 3 block lớn (tab hình, khối checklist, video overlay YouTube).
- `reviews.html`: carousel testimonials tự động + dot điều hướng.
- `cta.html`: khối gradient bo góc 20/80px giống bản gốc.
- `footer.html`: thông tin liên hệ, mạng xã hội, quick links, năm động.

Mỗi section gắn `data-animate` để IntersectionObserver kích hoạt animation `fade-up` khi cuộn vào viewport.

---

### 5. Responsive & animation
- Breakpoint của Tailwind sử dụng mặc định (sm/md/lg/xl/2xl) với padding container custom.
- Hover state: shadow, scale, border color đúng bản gốc (ví dụ card feature hover nâng nhẹ).
- Animation:
  - `animate-fade-up`: trễ 0.8s, easing smooth.
  - `animate-float`: áp dụng cho shape trang hero.
  - Carousel testimonial tự chạy 6s/lần, có thể chọn thủ công bằng dot.
  - Video overlay mở iframe YouTube với autoplay và tắt trả về `about:blank`.

---

### 6. Hướng dẫn chạy
```bash
npm install
npm run build        # tạo public/css/main.css
npm run preview      # mở http://localhost:8080 (mặc định http-server)
```
*(hoặc `npm run dev` để vừa build vừa watch khi chỉnh CSS/component)*.

Sau khi khởi chạy server, mở `http://localhost:8080` (hoặc port hiển thị trong terminal) để kiểm tra UI.

---

### 7. Tùy biến nhanh
- Thay nội dung từng section trong `src/components`.
- Điều chỉnh palette/spacing trong `tailwind.config.js`.
- Thêm animation hoặc component mới bằng cách tạo file `.html` mới và đặt placeholder `data-component="<tên>"` trong `index.html`.

---

## 8. Deploy lên Vercel

### Cấu hình Vercel

1. **Build Settings trong Vercel Dashboard:**
   - **Build Command:** `npm run build`
   - **Output Directory:** `./` (root)
   - **Install Command:** `npm install`

2. **Hoặc tạo file `vercel.json` (tùy chọn):**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".",
  "devCommand": "npm run dev"
}
```

3. **Deploy:**
   - Kết nối GitHub repo với Vercel
   - Vercel sẽ tự động detect và build
   - File `public/css/main.css` sẽ được build tự động trên Vercel

---

## 9. Danh sách file PHẢI đẩy lên GitHub

### ✅ Bắt buộc phải commit:

**Source Code:**
- `index.html` - Entry point chính
- `src/` - Toàn bộ thư mục source
  - `src/components/*.html` - Tất cả component HTML
  - `src/css/tailwind.css` - File Tailwind source
  - `src/assets/` - Assets nếu có

**Configuration:**
- `package.json` - Dependencies và scripts
- `package-lock.json` - Lock version dependencies (QUAN TRỌNG)
- `tailwind.config.js` - Cấu hình Tailwind
- `postcss.config.js` - Cấu hình PostCSS

**Assets:**
- `public/assets/images/` - Tất cả hình ảnh, SVG, icons
- `public/js/app.js` - JavaScript logic

**Documentation:**
- `README.md` - File này
- `.gitignore` - Git ignore rules

### ❌ KHÔNG được commit (đã có trong .gitignore):

- `node_modules/` - Dependencies (Vercel sẽ install tự động)
- `public/css/main.css` - File build (Vercel sẽ build tự động)
- `.env*` - Environment variables nếu có
- `.vscode/`, `.idea/` - IDE settings
- `*.log` - Log files
- `.DS_Store`, `Thumbs.db` - OS files

### 📝 Lệnh Git để đẩy lên GitHub:

```bash
# Kiểm tra file sẽ được commit
git status

# Thêm tất cả file cần thiết
git add .

# Commit
git commit -m "Initial commit: Pinwheel landing page"

# Đẩy lên GitHub (thay <branch> bằng main hoặc master)
git push origin <branch>
```

### ⚠️ Lưu ý quan trọng:

1. **`package-lock.json` PHẢI commit** - Đảm bảo Vercel install đúng version dependencies
2. **`public/css/main.css` KHÔNG commit** - Vercel sẽ build tự động từ `src/css/tailwind.css`
3. **Tất cả assets trong `public/assets/` PHẢI commit** - Cần thiết để website chạy
4. **File `.gitignore` đã được cấu hình đúng** - Không cần chỉnh sửa thêm

---

Dự án đã cover đầy đủ yêu cầu UI/UX, spacing, typography, animation giống site gốc và giữ codebase sạch, dễ mở rộng. Cứ tùy ý liên hệ nếu cần chỉnh sửa thêm!

