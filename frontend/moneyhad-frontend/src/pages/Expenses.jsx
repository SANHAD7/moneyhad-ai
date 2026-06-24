import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";

function Expenses() {

  const [expenses, setExpenses] = useState([]);

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const token = localStorage.getItem("token");

function loadExpenses() {

  api.get(
    "/api/expense/all",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {

      setExpenses(response.data);

    })
    .catch(error => {

      if (error.response?.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/";

        return;

      }

      console.log(error);

    });

}


  useEffect(() => {

    loadExpenses();

  }, []);

function handleAddExpense() {

  setLoading(true);

  const request = editingId

    ? api.put(
        `/api/expense/update/${editingId}`,
        {
          category,
          amount,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

    : api.post(
        "/api/expense/add",
        {
          category,
          amount,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

  request
    .then(response => {

      toast.success(response.data);

      setCategory("");
      setAmount("");
      setDescription("");

      setEditingId(null);

      loadExpenses();

    })
    .catch(error => {

      if (error.response?.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/";

        return;

      }

      toast.error(
        editingId
          ? "Failed to update expense"
          : "Failed to add expense"
      );

      console.log(error);

    })
    .finally(() => {

      setLoading(false);

    });

}
function handleDelete(id) {

  api.delete(
    `/api/expense/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {

      toast.success(response.data);

      loadExpenses();

    })
    .catch(error => {

      if (error.response?.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/";

        return;

      }

      toast.error("Failed to delete");

      console.log(error);

    });

}
function handleEdit(expense) {

  setEditingId(expense.id);

  setCategory(expense.category);

  setAmount(expense.amount);

  setDescription(expense.description);

}

return (

    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-bold mb-8">
          Expenses 💸
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Add Expense
          </h2>

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            className="w-full border rounded-xl p-4 mb-4"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full border rounded-xl p-4 mb-6"
          />

          <button
            disabled={loading}
            onClick={handleAddExpense}
            className="bg-purple-600 text-white px-8 py-4 rounded-xl hover:bg-purple-700 transition-all duration-300 disabled:bg-gray-400"
          >

            {loading
  ? "Saving..."
  : editingId
  ? "Update Expense"
  : "Add Expense"}

          </button>

        </div>


        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between mb-6">

            <h2 className="text-2xl font-bold">
              Recent Transactions
            </h2>

            <h2 className="text-xl text-purple-700 font-semibold">
              Total Expenses : {expenses.length}
            </h2>

          </div>
<input
  type="text"
  placeholder="Search category..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="border rounded-xl p-3 mb-6 w-80"
/>
 <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="border rounded-xl p-3"
  >

    <option value="">All</option>
<option value="food">Food</option>
<option value="rent">Rent</option>
<option value="car">Car</option>
<option value="shoes">Shoes</option>

  </select>
          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-4">
                  Category
                </th>

                <th className="text-left p-4">
                  Amount
                </th>

                <th className="text-left p-4">
                  Description
                </th>

                <th className="text-left p-4">
                  Date
                </th>
                <th className="text-left p-4">
  Action
</th>

              </tr>

            </thead>

            <tbody>

              {

expenses
.filter(expense =>
  expense.category
    .toLowerCase()
    .includes(search.toLowerCase())
)
.filter(expense =>
  selectedCategory === "" ||
  expense.category.toLowerCase() === selectedCategory.toLowerCase()
)
.map((expense, index) => (

  <tr
    key={index}
    className="border-b hover:bg-slate-50"
  >

    <td className="p-4">
      <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
        {expense.category}
      </span>
    </td>

    <td className="p-4 font-semibold">
      ₹{expense.amount}
    </td>

    <td className="p-4">
      {expense.description}
    </td>

    <td className="p-4 text-gray-500">
      {expense.date}
    </td>

    <td className="p-4">

      <button
        onClick={() => handleEdit(expense)}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
      >
        Edit
      </button>

      <button
        onClick={() => handleDelete(expense.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Delete
      </button>

    </td>

  </tr>

))

}

</tbody>

</table>

</div>

</div>

</div>

);

}

export default Expenses;