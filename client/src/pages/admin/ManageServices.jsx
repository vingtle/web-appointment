import React, { useState } from "react";
import "./managerservices.css";

const AdminAdvancedSkinCare = () => {
  const [treatments, setTreatments] = useState([
    {
      id: 1,
      name: "Skin Cleansing Care",
      duration: "15 min",
      price: "15 €",
      description: "A deep cleansing treatment to rejuvenate your skin.",
    },
    {
      id: 2,
      name: "Eyes Contour Care",
      duration: "20 min",
      price: "25 €",
      description:
        "A targeted treatment for reducing puffiness and dark circles.",
    },
  ]);

  const [newTreatment, setNewTreatment] = useState({
    name: "",
    duration: "",
    price: "",
    description: "",
  });
  const [editingTreatment, setEditingTreatment] = useState(null);

  const handleAddTreatment = () => {
    if (
      !newTreatment.name ||
      !newTreatment.duration ||
      !newTreatment.price ||
      !newTreatment.description
    ) {
      alert("Please fill out all fields.");
      return;
    }

    setTreatments((prev) => [
      ...prev,
      { ...newTreatment, id: Date.now() }, // Assign a unique ID
    ]);
    setNewTreatment({ name: "", duration: "", price: "", description: "" }); // Reset form
  };

  const handleEditTreatment = (treatment) => {
    setEditingTreatment(treatment);
  };

  const handleUpdateTreatment = () => {
    setTreatments((prev) =>
      prev.map((treatment) =>
        treatment.id === editingTreatment.id ? editingTreatment : treatment
      )
    );
    setEditingTreatment(null); // Close editing
  };

  const handleDeleteTreatment = (id) => {
    setTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
  };

  return (
    <div className="admin-advanced-skin-care">
      <h1>Admin: Manage Advanced Skin Care</h1>

      {/* Add New Treatment */}
      <div className="add-treatment">
        <h3>Add New Treatment</h3>
        <input
          type="text"
          placeholder="Name"
          value={newTreatment.name}
          onChange={(e) =>
            setNewTreatment({ ...newTreatment, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Duration"
          value={newTreatment.duration}
          onChange={(e) =>
            setNewTreatment({ ...newTreatment, duration: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Price"
          value={newTreatment.price}
          onChange={(e) =>
            setNewTreatment({ ...newTreatment, price: e.target.value })
          }
        />
        <textarea
          placeholder="Description"
          value={newTreatment.description}
          onChange={(e) =>
            setNewTreatment({ ...newTreatment, description: e.target.value })
          }
        />
        <button onClick={handleAddTreatment}>Add Treatment</button>
      </div>

      {/* Treatment List */}
      <div className="treatment-list">
        <h3>Existing Treatments</h3>
        {treatments.map((treatment) => (
          <div key={treatment.id} className="treatment-card">
            {editingTreatment && editingTreatment.id === treatment.id ? (
              <>
                <input
                  type="text"
                  value={editingTreatment.name}
                  onChange={(e) =>
                    setEditingTreatment({
                      ...editingTreatment,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editingTreatment.duration}
                  onChange={(e) =>
                    setEditingTreatment({
                      ...editingTreatment,
                      duration: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={editingTreatment.price}
                  onChange={(e) =>
                    setEditingTreatment({
                      ...editingTreatment,
                      price: e.target.value,
                    })
                  }
                />
                <textarea
                  value={editingTreatment.description}
                  onChange={(e) =>
                    setEditingTreatment({
                      ...editingTreatment,
                      description: e.target.value,
                    })
                  }
                />
                <button onClick={handleUpdateTreatment}>Update</button>
                <button onClick={() => setEditingTreatment(null)}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h4>{treatment.name}</h4>
                <p>Duration: {treatment.duration}</p>
                <p>Price: {treatment.price}</p>
                <p>{treatment.description}</p>
                <button onClick={() => handleEditTreatment(treatment)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteTreatment(treatment.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAdvancedSkinCare;
