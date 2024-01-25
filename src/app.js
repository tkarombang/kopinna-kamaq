document.addEventListener('alpine:init', () => {
  Alpine.data('products', () => ({
    items: [{
        id: 1,
        name: 'Robusta Mamasa',
        img: '1.jpg',
        price: 20000,
        detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt at magni qui aspernatur earum porro',
      },
      {
        id: 2,
        name: 'Arabica-Robusta',
        img: '2.jpg',
        price: 25000,
        detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus laborum sed, cupiditate porro voluptates non voluptatibus! Vel voluptatibus corrupti quidem.',
      },
      {
        id: 3,
        name: 'Arabica Toraja',
        img: '3.jpg',
        price: 20000,
        detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, et.',
      },
      {
        id: 4,
        name: 'Primo Passo',
        img: '4.jpg',
        price: 30000,
        detail: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint voluptatem molestiae inventore nulla accusamus laudantium sed impedit.',
      },
      {
        id: 5,
        name: 'Gayo Aceh',
        img: '5.jpg',
        price: 35000,
        detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, ducimus praesentium! Placeat, omnis quod!',
      },
    ],

  }));

  Alpine.store('cart', {
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
          total: newItem.price
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
        })
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
        })
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
    }
  })
});

// Form Validation Checkout Button
const checkoutButton = document.querySelector('.checkout-button');
checkoutButton.disabled = true;

const formInputCostumerDetail = document.querySelector('#checkoutForm');
formInputCostumerDetail.addEventListener('keyup', function () {
  for (let i = 0; i < formInputCostumerDetail.length; i++) {
    if (formInputCostumerDetail.elements[i].value.length !== 0) { //kata pak Dika ada element yang kosong
      checkoutButton.classList.remove('disabled');
      // checkoutButton.classList.add('disabled');
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove('disabled');
});

// Konversi Ke-Rp
const rupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};