import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Transaction from './components/Transaction';
import FormComponent from './components/FormComponent';
import DataContext from './data/DataContext';
import ReportComponent from './components/ReportComponent';

function App() {
  const design = { color: "red", textAlign: "center", fontSize: "1.9rem" };

  const initData = [];

  const [items, setItems] = useState(initData);
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);

  const onAddNewItem = (newItem) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  useEffect(() => {
    const amounts = items.map(item => item.amount);
    const income = amounts.filter(element => element > 0).reduce((total, element) => total + element, 0)
    const expense = (amounts.filter(element => element < 0).reduce((total, element) => total + element, 0)) * -1
        
    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [items]);

  return (
    <DataContext.Provider value={{ income: reportIncome, expense: reportExpense }}>
      <Router>
        <div className="container">
          <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
          <ul className="horizontal-menu">
            <li>
              <Link to="/">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to="/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          <Routes>
            <Route path='/' element={<ReportComponent />} />
            <Route path='/insert' element={<><FormComponent onAddItem={onAddNewItem} /> <Transaction items={items} /></>} />
          </Routes>
        </div>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
