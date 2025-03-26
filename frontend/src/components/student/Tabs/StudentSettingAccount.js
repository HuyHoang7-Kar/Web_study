import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function StudentSettingAccount() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    username: "",
    birth_date: "",
    gender: "Nam",
    address: "",
    avatar: null,
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // Functional update để tránh dependency không cần thiết
      setFormData((prev) => ({ ...prev, ...JSON.parse(storedUser) }));
    } else {
      navigate("/login", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setFormData((prev) => ({ ...prev, avatar: file }));
    } else {
      alert("Chỉ chấp nhận file .jpg hoặc .png");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.newPassword &&
      formData.newPassword !== formData.confirmNewPassword
    ) {
      alert("Mật khẩu mới không khớp!");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:8000/api/auth/update/", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Cập nhật thành công!");
        localStorage.setItem("user", JSON.stringify(formData));
      } else {
        alert(`Lỗi: ${result.error}`);
      }
    } catch (error) {
      alert("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>
          <FaUserEdit size={24} color="#003366" /> Cập Nhật Thông Tin Tài Khoản
        </h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.sectionContainer}>
            <div style={styles.section}>
              <input
                type="text"
                name="full_name"
                placeholder="Họ và tên"
                required
                value={formData.full_name}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div style={styles.section}>
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="username"
                placeholder="Tên đăng nhập"
                required
                value={formData.username}
                readOnly
                style={styles.inputDisabled}
              />
              <input
                type="text"
                name="address"
                placeholder="Địa chỉ"
                value={formData.address}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          </div>
          <label style={{ fontWeight: "bold", marginTop: "20px", color: "#003366" }}>
            Ảnh đại diện
          </label>
          <input
            type="file"
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            style={styles.input}
          />
          <h3 style={{ marginTop: "20px", color: "#003366" }}>Đổi mật khẩu</h3>
          <input
            type="password"
            name="newPassword"
            placeholder="Mật khẩu mới"
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="password"
            name="confirmNewPassword"
            placeholder="Xác nhận mật khẩu mới"
            onChange={handleChange}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  outerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage:
      "url('https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formContainer: {
    width: "900px",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  },
  title: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  sectionContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  section: {
    width: "45%",
    backgroundColor: "rgba(200, 200, 200, 0.3)",
    padding: "15px",
    borderRadius: "8px",
  },
  input: {
    width: "95%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  inputDisabled: {
    width: "95%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    backgroundColor: "#e0e0e0",
    cursor: "not-allowed",
  },
  select: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#003366",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    textTransform: "uppercase",
    marginTop: "15px",
  },
};

export default StudentSettingAccount;
