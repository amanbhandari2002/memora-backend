const express = require("express");
const getNextMonday= (date = new Date()) =>{
    const day = date.getDay(); // 0 (Sun) - 6 (Sat)
    const diff = (day === 1 ? 7 : (8 - day) % 7);
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    monday.setHours(0, 0, 0, 0);
    return monday;
}

module.exports = {getNextMonday}