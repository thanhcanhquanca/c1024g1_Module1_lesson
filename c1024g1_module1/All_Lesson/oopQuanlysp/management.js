class UserManager{
    array_list; tbody ; is_Status; idusers;
    constructor() {
        this.array_list = [];
        this.tbody = "";
        this.is_Status = false;
        this.idusers = "";
    }

    generateRandomID(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        let isDuplicate = false;

        do {
            id = '';  // Reset ID cho mỗi lần tạo mới
            for (let i = 0; i < length; i++) {
                id += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            // Kiểm tra trùng ID trong mảng array_list
            for (let i = 0; i < this.array_list.length; i++) {
                if (this.array_list[i].id === id) {
                    isDuplicate = true;
                    break;
                }
            }

        } while (isDuplicate);

        return id;
    }


    btnSave() {
        const currentTime = new Date().toLocaleString();

        if (this.is_Status) {
            // Update existing user
            const userIndex = this.array_list.findIndex(user => user.id === this.idusers);
            if (userIndex !== -1) {
                this.array_list[userIndex].name = document.getElementById("name").value;
                this.array_list[userIndex].gender = document.querySelector('input[name="gender"]:checked').value;
                this.array_list[userIndex].dateOfBirth = `${document.getElementById("dayInput").value} / ${document.getElementById("monthInput").value} / ${document.getElementById("yearInput").value}`;
                this.array_list[userIndex].phone = document.getElementById("numberPhone").value;
                this.array_list[userIndex].money = document.getElementById("numberMoney").value;
                this.array_list[userIndex].introduce = document.getElementById("introduce").value;
                this.array_list[userIndex].image = document.getElementById("linkImg").value;
                this.array_list[userIndex].timestamp = currentTime;
            }

            this.is_Status = false;
            this.idusers = "";
            document.getElementById("updater").innerText = "Lưu";
        } else {
            // Create new user
            const newUser = new Users(
                this.generateRandomID(7),
                document.getElementById("name").value,
                document.querySelector('input[name="gender"]:checked').value,
                `${document.getElementById("dayInput").value} / ${document.getElementById("monthInput").value} / ${document.getElementById("yearInput").value}`,
                document.getElementById("numberPhone").value,
                document.getElementById("numberMoney").value,
                document.getElementById("introduce").value,
                document.getElementById("linkImg").value,
                currentTime
            );

            this.array_list.push(newUser);
        }

        // Display the updated user list and clear input fields
        this.displayProduct();
        this.spaceVoid();
    }



    spaceVoid() {
        document.getElementById("name").value = "";
        document.querySelector('input[name="gender"][value="Nam"]').checked = true;
        document.getElementById("dayInput").value = "";
        document.getElementById("monthInput").value = "";
        document.getElementById("yearInput").value = "";
        document.getElementById("numberPhone").value = "";
        document.getElementById("numberMoney").value = "";
        document.getElementById("introduce").value = "";
        document.getElementById("linkImg").value = "";
    }


    displayProduct() {
        const content = document.getElementById("content");
        this.tbody = "";

        this.array_list.forEach((user, index) => {
            this.tbody += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.gender}</td>
                    <td>${user.dateOfBirth}</td>
                    <td>${user.phone}</td>
                    <td>${user.money}</td>
                    <td>${user.introduce}</td>
                    <td><img src="${user.image}" class="cssimg" alt="hình ảnh"></td>
                    <td>${user.timestamp}</td>
                    <td>
                        <button class="cssbtnedit" onclick="userManager.editProduct('${user.id}')">Edit</button>
                        <button class="cssbtndelete" onclick="userManager.deleteProduct('${user.id}')">Delete</button>
                    </td>
                </tr>`;
        });

        content.innerHTML = this.tbody;
    }


    editProduct(id) {
        const user = this.array_list.find(function (users) {
            return users.id === id;
        });

        if (user) {
            document.getElementById("name").value = user.name;
            document.querySelector(`input[name="gender"][value="${user.gender}"]`).checked = true;
            const [day, month, year] = user.dateOfBirth.split(" / ");
            document.getElementById("dayInput").value = day;
            document.getElementById("monthInput").value = month;
            document.getElementById("yearInput").value = year;
            document.getElementById("numberPhone").value = user.phone;
            document.getElementById("numberMoney").value = user.money;
            document.getElementById("introduce").value = user.introduce;
            document.getElementById("linkImg").value = user.image;


            this.is_Status = true;
            this.idusers = id;
            document.getElementById("updater").innerText = "Cập Nhập";
        }
    }



    deleteProduct(id) {
        const index = this.array_list.findIndex(function (users) {
            return users.id === id;
        });

        if (index !== -1) {
            this.array_list.splice(index, 1);
            this.displayProduct();
        }
    }
}


const userManager = new UserManager();
document.getElementById("updater").onclick = function() {
 userManager.btnSave();
};