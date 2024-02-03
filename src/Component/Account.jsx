import React, { useState, useEffect } from 'react';

const AccountManagementPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Load accounts from local storage on component mount
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    setAccounts(storedAccounts);
  }, []);

  useEffect(() => {
    // Save accounts to local storage whenever it changes
    localStorage.setItem('accounts', JSON.stringify(accounts));
  }, [accounts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // If editing an existing account
      const updatedAccounts = [...accounts];
      updatedAccounts[editIndex] = formData;
      setAccounts(updatedAccounts);
      setEditIndex(null);
    } else {
      // If adding a new account
      setAccounts((prevAccounts) => [...prevAccounts, formData]);
    }

    setFormData({ name: '', email: '', password: '' });
  };

  const handleEdit = (index) => {
    setFormData(accounts[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    const updatedAccounts = [...accounts];
    updatedAccounts.splice(index, 1);
    setAccounts(updatedAccounts);
  };

  const closeModal = () => {
    setFormData({ name: '', email: '' });
    setEditIndex(null);
    setShowModal(false);
  };

  const logout = () => {
    localStorage.removeItem('signUp');
    window.location.reload();
  };
  const deleteAccount = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <div className="header">
        <h1>Home Page </h1>
        <p>Wellcome {localStorage.getItem('name')}</p>
        <button onClick={logout} className="logout">
          LogOut
        </button>
        <button onClick={deleteAccount} className="delete">
          Delete
        </button>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label>Account Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <label>Email Used:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>

      <h2>Accounts:</h2>
      <ul>
        {accounts.map((account, index) => (
          <li key={index}>
            {account.name} - {account.email}
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Edit Account</h2>
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountManagementPage;
