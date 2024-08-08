import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const ref = useRef();
  const passwordRef = useRef();

  const getPasswords = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      const passwords = await response.json();
      if (Array.isArray(passwords)) {
        setPasswordArray(passwords);
      } else {
        console.error("Expected an array but got:", passwords);
      }
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        if (form.id) {
          await fetch("http://localhost:3000/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: form.id }),
          });
        }

        const newId = form.id || uuidv4();
        await fetch("http://localhost:3000/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, id: newId }),
        });

        setPasswordArray([
          ...passwordArray.filter((item) => item.id !== form.id),
          { ...form, id: newId },
        ]);
        setForm({ site: "", username: "", password: "" });
        toast("Password Saved..!!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error saving password:", error);
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (id) => {
    const itemToEdit = passwordArray.find((item) => item.id === id);
    setForm(itemToEdit);
  };

  const handleDelete = async (id) => {
    try {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      toast("Password Deleted..!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error deleting password:", error);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard..!!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>

      <div className="p-2 md: myContainer min-h-[88.2vh]:">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500"> &lt;</span>
          Pass
          <span className="text-green-500">Manager/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type={showPassword ? "text" : "password"}
                name="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={togglePasswordVisibility}
                aria-label="Toggle password visibility"
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src={showPassword ? "icons/eye-off.png" : "icons/eye.png"}
                  alt="Toggle visibility"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8 py-2 w-fit border border-green-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full ">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="text-center py-2 border border-white">
                      <div className="flex items-center justify-center p-1 gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span>{item.site}</span>
                        </a>
                        <img
                          onClick={() => {
                            copyText(item.site);
                          }}
                          width={16}
                          className="cursor-pointer"
                          src="icons/copy.svg"
                          alt="Copy"
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white">
                      <div className="flex items-center justify-center gap-2 p-1">
                        <span>{item.username}</span>
                        <img
                          onClick={() => {
                            copyText(item.username);
                          }}
                          width={16}
                          className="cursor-pointer"
                          src="icons/copy.svg"
                          alt="Copy"
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white">
                      <div className="flex items-center justify-center p-1 gap-2">
                        <span>{item.password}</span>
                        <img
                          onClick={() => {
                            copyText(item.password);
                          }}
                          width={16}
                          className="cursor-pointer"
                          src="icons/copy.svg"
                          alt="Copy"
                        />
                      </div>
                    </td>
                    <td className="text-center py-2 border border-white">
                      <div className="flex items-center justify-center p-2 gap-3">
                        <button
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                          className="bg-transparent cursor-pointer border-none p-1"
                        >
                          <img
                            src="icons/edit.svg"
                            alt="edit"
                            className="w-5 h-5"
                          />
                        </button>
                        <button
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                          className="bg-transparent cursor-pointer border-none p-1"
                        >
                          <img
                            src="icons/delete.svg"
                            alt="delete"
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
