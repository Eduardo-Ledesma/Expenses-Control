import { useState, useEffect, createContext } from "react"
import { toast } from "react-toastify"

const AdminContext = createContext()

const AdminProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [formAddExpense, setFormAddExpense] = useState(false)
    const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) ?? [])
    const [total, setTotal] = useState(0)
    const [expense, setExpense] = useState({})
    const [expensesUser1, setExpensesUser1] = useState([])
    const [expensesUser2, setExpensesUser2] = useState([])

    const divideExpenses = () => {
        setExpensesUser1(expenses.filter(exp => exp.user === 1).reduce((acc, exp) => exp.price + acc, 0))
        setExpensesUser2(expenses.filter(exp => exp.user === 2).reduce((acc, exp) => exp.price + acc, 0))
    }    

    const resetApp = () => {
        setExpenses([])
        setTotal(0)
        setExpensesUser1([])
        setExpensesUser2([])
        localStorage.removeItem('expenses')
    }

    const calcTotal = () => {
        const totalExpenses = expenses.reduce((acc, exp) => exp.price + acc, 0)
        setTotal(totalExpenses);
    }

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses))
        calcTotal()
        divideExpenses()
    }, [expenses])

    // Agregar el gasto
    const addExpense = expense => {
        setExpenses([...expenses, expense])

        handleFormAddExpense()
        toast.success('Gasto Agregado!', {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
        });
    }

    // Editar el gasto
    const editExpense = expense => {
        const updatedExpenses = expenses.map(el => el.id === expense.id ? expense : el)
        setExpenses(updatedExpenses)
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses))

        handleFormAddExpense()
        toast.success('Gasto Editado Correctamente!', {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
        });
    }

    // Eliminar el gasto
    const deleteExpense = id => {
        const updatedExpenses = expenses.filter(exp => exp.id !== id)
        setExpenses(updatedExpenses)
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses))

        handleFormAddExpense()
        toast.success('Gasto Eliminado!', {
            position: "top-center",
            autoClose: 3000,
            theme: "colored",
        });
    }

    // Definir el usuario
    const handleUser = num => {
        setUser(num)
    }

    // Ocultar el modal de formulario
    const handleFormAddExpense = () => {
        setFormAddExpense(false)
        setExpense({})
    }

    // Handle para manejar agregar gasto
    const handleAddExpense = expense => {
        addExpense(expense)
    }

    // handle para llenar el form con el gasto a editar
    const handleEditExpense = expense => {
        setExpense(expense)
        setFormAddExpense(true)
    }

    // Handle para manejar confirmar editar gasto
    const handleConfirmEditExpense = expense => {
        editExpense(expense)
    }

    // Handle para manejar eliminar gasto
    const handleDeleteExpense = id => {
        deleteExpense(id)
    }

    const handleLogOut = () => {
        setUser(null)
    }


    return <AdminContext.Provider
        value={{
            handleUser,
            user,
            formAddExpense,
            setFormAddExpense,
            handleFormAddExpense,
            handleAddExpense,
            expenses,
            total,
            handleEditExpense,
            handleConfirmEditExpense,
            handleDeleteExpense,
            expense,
            resetApp,
            expensesUser1,
            expensesUser2,
            handleLogOut
        }}
    >
        {children}
    </AdminContext.Provider>
}

export { 
    AdminProvider
}

export default AdminContext