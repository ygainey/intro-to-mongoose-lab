const prompt = require('prompt-sync')();
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

//import the mongoose model
const Customer = require('./models/customer.js');

let custName
let custAge
let custID


async function crm(){
    if(mongoose.connection.readyState){

    }else{
        await connect()
    }
    const action = prompt(`
        Welcome to the CRM
        
        What would you like to do?
        
          1. Create a customer
          2. View all customers
          3. Update a customer
          4. Delete a customer
          5. quit
        
        Number of action to run: 
        `)
    // parseInt(action)
    // console.log(action)

    // if(action > 5 || action === 0 || action !== Number){
    //     console.log('Please provide a correct number input')
    //     crm()
    //     return
    // }
    if(action === '1'){
        custName = prompt(`Please enter customer Name: `)
        custAge = prompt(`Please enter customer Age: `)
        const custData = {
            name : custName,
            age: custAge,
        }
        createCustomer(custData)
    }else if(action === '2'){
        index()
    }else if(action === '3'){
        await index()
        const custID = prompt(`Enter ID of user that you want to edit: `)
        custName = prompt(`Please enter customer Name: `)
        custAge = prompt(`Please enter customer Age: `)
        const custData = {
            name : custName,
            age: custAge,
        }
        update(custID, custData)
    }else if(action === '4'){
        await index()
        const custID = prompt(`Enter ID of user that you want to delete: `)
        deleteCust(custID)
    }else if(action === '5'){
        await mongoose.connection.close() 
        process.exit()
    }
    
}

const createCustomer = async (data) => {
    try {
        const customer = await Customer.create(data)   
    } catch (error) {
        console.log(error)        
    }
}

const index = async () => {
    try {
        const customers = await Customer.find({})
        console.log(customers)   
    } catch (error) {
        console.log(error)        
    }
}

const update = async (id, data) => {
    try {
        const updateCustomer = await Customer.findByIdAndUpdate(id, data)      
    } catch (error) {
        console.log(error)        
    }
}

const deleteCust = async (id) => {
    try {
        const delCustomer = await Customer.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)        
    }
}

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('connected')                
    } catch (error) {
        console.log(error)         
    }
}

crm()
