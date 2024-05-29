document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        name: "Robusta Mamasa",
        img: "1.jpg",
        price: 20000,
        detail:
          "Kopi Robusta Mamasa adalah jenis kopi yang tumbuh di dataran tinggi Mamasa, Sulawesi Barat, yang dikenal dengan ketahanan dan kekuatan rasanya. Memiliki tingkat keasaman yang rendah namun dengan rasa pahit yang kuat dan kaya, kopi ini menawarkan karakter yang intens dengan sentuhan earthy dan hint cokelat. Proses pengolahan tradisionalnya memastikan setiap biji kopi mempertahankan kualitas dan aroma khasnya, menjadikannya pilihan tepat bagi mereka yang menyukai kopi dengan profil rasa yang robust dan bold.",
      },
      {
        id: 2,
        name: "Arabica-Robusta",
        img: "2.jpg",
        price: 25000,
        detail:
          "Kopi Arabica-Robusta Mamasa adalah perpaduan unik dari biji kopi Arabica dan Robusta yang tumbuh di dataran tinggi Mamasa, Sulawesi Barat. Menggabungkan kehalusan dan keasaman seimbang dari Arabica dengan kekuatan dan rasa pahit khas Robusta, kopi ini menawarkan pengalaman rasa yang kompleks dan memuaskan, sempurna untuk pecinta kopi yang menginginkan harmoni antara kekayaan rasa dan aroma.",
      },
      {
        id: 3,
        name: "Arabica Toraja",
        img: "3.jpg",
        price: 20000,
        detail:
          "Kopi Arabica Toraja berasal dari pegunungan Toraja, Sulawesi Selatan. Kopi ini dikenal dengan profil rasa yang kompleks dan mendalam, menggabungkan keasaman yang cerah dengan body yang medium. Aromanya kaya akan rempah dan kadang-kadang menyertakan hint buah-buahan tropis, menjadikannya pilihan favorit bagi para penikmat kopi yang mencari pengalaman rasa yang unik dan eksotis.",
      },
      {
        id: 4,
        name: "Primo Passo",
        img: "4.jpg",
        price: 30000,
        detail:
          "Kopi Primo Paso menawarkan rasa yang kaya dan berlapis, dengan dominasi sentuhan cokelat dan buah-buahan kering. Dikenal dengan kehalusan dan keseimbangannya, kopi ini memberikan keasaman yang lembut dan body yang smooth, membuatnya sempurna untuk dinikmati kapan saja, baik di pagi hari maupun sebagai teman santai di sore hari.",
      },
      {
        id: 5,
        name: "Gayo Aceh",
        img: "5.jpg",
        price: 35000,
        detail:
          "Kopi Gayo Aceh berasal dari dataran tinggi Gayo di Aceh, dan dikenal sebagai salah satu kopi spesialti paling dicari di Indonesia. Kopi ini memiliki karakteristik keasaman yang rendah dengan body yang penuh, serta aroma floral yang khas. Cita rasanya yang smooth dan bersahaja membuatnya sangat digemari oleh para penikmat kopi di seluruh dunia.",
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // this.items.push(newItem);
      // this.quantity++;
      // this.total += newItem.total;
      // console.log(newItem);

      // cek apakah ada barang yang sama di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada / cart masih kosong
      if (!cartItem) {
        this.items.push({
          ...newItem,
          quantity: 1,
          total: newItem.price,
        });
        // this.items mau di console.log untuk melihat seperti apa data yang ada diddalam
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika barang sudah ada, cek apakah barang beda atau sama dengan yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // Jika barang sudah ada, tambah quantity dan totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
    },
    remove(id) {
      // ambil item berdasarkan id nya
      const cartItem = this.items.find((item) => item.id === id);

      // jika item lebih dari 1
      if (cartItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang di klik
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (cartItem.quantity === 1) {
        // Jika barangnya sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    },
    productDetail: [],
    // barangDetail: 0,
    // hargaDetail: 0,
    show(showItem) {
      // manambah elemen pada array productDetail
      this.productDetail.push(showItem);
    },
    delet(showItem) {
      // menghapus elemen pada array productDetail
      this.productDetail.pop(showItem);
    },
  });
});

// Form Validation Checkout Button
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const checkoutForm = document.querySelector("#checkoutForm");

checkoutForm.addEventListener("keyup", function () {
  for (let i = 0; i < checkoutForm.elements.length; i++) {
    if (checkoutForm.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// Kirim data ketika tombol checkout diklik
checkoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  const formData = new FormData(checkoutForm);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  console.log(objData);
  const messange = formatMessange(objData);
  window.open("http://wa.me/6285159501107?text=" + encodeURIComponent(messange));
});

// Format Pesan Whatsapp
const formatMessange = (obj) => {
  return `Data Customer
    Nama: ${obj.name}
    Email: ${obj.email}
    Nohp: ${obj.phone}
Data Pesanan
${JSON.parse(obj.items).map((item) => `${item.name} ${item.quantity} x ${rupiah(item.total)} \n`)}
  TOTAL: ${rupiah(obj.total)}
  Terima kasih`;
};

// Konversi Ke-Rp
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
