import { useState } from "react";
import ProductSummary from "../components/ProductSummary";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export default function OrderFlow() {
  const [selectPlanFlow, setselectPlanFlow] = useState(true);
  const [registerFlow, setRegisterFlow] = useState(false);
  const [detailFlow, setDetailFlow] = useState(false);
  const [checkoutFlow, setCheckoutFlow] = useState(false);

  const goToStep2 = () => {
    setselectPlanFlow(false);
    setRegisterFlow(true);
  };
  const recipeOptions = [
    { id: "recipe1", name: "Chinese", value: "Chinese" },
    { id: "recipe2", name: "Thai", value: "Thai" },
    { id: "recipe3", name: "Mexican", value: "Mexican" },
    { id: "recipe4", name: "Italian", value: "Italian" },
    { id: "recipe5", name: "Chinese", value: "Chinese" },
    { id: "recipe6", name: "Arabian", value: "Arabian" },
    { id: "recipe7", name: "Regional", value: "Regional" },
    { id: "recipe8", name: "Seasonal", value: "Seasonal" },
    { id: "recipe9", name: "B.B.Q", value: "BBQ" },
  ];
  const peopleOptions = [
    { id: "people2", value: 2, label: "2" },
    { id: "people3", value: 3, label: "3" },
    { id: "people4", value: 4, label: "4" },
    // Add more options as needed
  ];
  const saveOrderDataToDatabase = async () => {
    try {
      app.post("/api/saveOrderData", (req, res) => {
        const { selectedPeople, formData, selectedRecipes } = req.body;
        console.log(
          "🚀 ~ file: OrderFlow.jsx:37 ~ app.post ~ selectedRecipes:",
          selectedRecipes
        );
        console.log(
          "🚀 ~ file: OrderFlow.jsx:37 ~ app.post ~ formData:",
          formData
        );
        console.log(
          "🚀 ~ file: OrderFlow.jsx:37 ~ app.post ~ selectedPeople:",
          selectedPeople
        );

        // Insert data into the orders table
        const orderQuery =
          "INSERT INTO orders (selectedPeople, firstName, lastName, phone, address, city, zip) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const orderValues = [
          selectedPeople,
          formData.firstName,
          formData.lastName,
          formData.phone,
          formData.address,
          formData.city,
          formData.zip,
        ];

        connection.query(orderQuery, orderValues, (error, orderResults) => {
          if (error) {
            console.error(
              "Error inserting order data into the database:",
              error
            );
            res
              .status(500)
              .json({ success: false, error: "Internal Server Error" });
          } else {
            console.log("Order data inserted successfully:", orderResults);

            // Insert selected recipes into the order_recipes table
            const orderId = orderResults.insertId;
            const recipeQuery =
              "INSERT INTO order_recipes (order_id, recipe_id) VALUES (?, ?)";
            const recipeValues = selectedRecipes.map((recipeId) => [
              orderId,
              recipeId,
            ]);

            connection.query(recipeQuery, [recipeValues], (recipeError) => {
              if (recipeError) {
                console.error(
                  "Error inserting recipe data into the database:",
                  recipeError
                );
                res
                  .status(500)
                  .json({ success: false, error: "Internal Server Error" });
              } else {
                console.log("Recipe data inserted successfully.");
                res.status(200).json({ success: true });
              }
            });
          }
        });
      });

      const data = await response.json();

      if (data.success) {
        console.log("Data saved to the database successfully!");
      } else {
        console.error("Failed to save data to the database:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [selectedPeople, setSelectedPeople] = useState("");

  const handlePeopleChange = (value) => {
    setSelectedPeople(value);
  };

  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const handleCheckboxChange = (value) => {
    const isSelected = selectedRecipes.includes(value);

    if (isSelected) {
      setSelectedRecipes(selectedRecipes.filter((recipe) => recipe !== value));
    } else {
      setSelectedRecipes([...selectedRecipes, value]);
    }
  };
  const goToStep3 = () => {
    setRegisterFlow(false);
    setDetailFlow(true);
  };
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const recipePerWeekOptions = [
    { id: "recipePerWeek2", value: 2, label: "2" },
    { id: "recipePerWeek3", value: 3, label: "3" },
    { id: "recipePerWeek4", value: 4, label: "4" },
    { id: "recipePerWeek5", value: 5, label: "5" },
    // Add more options as needed
  ];

  // ...
  // Your existing code

  const [selectedRecipePerWeek, setSelectedRecipePerWeek] = useState("");

  const handleRecipePerWeekChange = (value) => {
    setSelectedRecipePerWeek(value);
  };

  const goToStep4 = () => {
    // const formData = new FormData(document.forms["detailForm"]);

    // Log the form data
    saveOrderDataToDatabase();
    console.log(
      "Form Data:",
      formData,
      "selectedPeople",
      selectedPeople,
      selectedRecipes
    );

    setDetailFlow(false);
    setCheckoutFlow(true);
  };
  const navigate = useNavigate();
  const handleButtonClickMyMenu = () => {
    console.log(
      "🚀 ~ file: OrderFlow.jsx:27 ~ handleButtonClickMyMenu ~ consol:"
    );
    // Navigate to the "/orderFlow" route
    navigate("/my-menu");
  };

  const { userSignInWithGoogle, authUser, userSignInWithFacebook } = useAuth();
  console.log("🚀 ~ file: OrderFlow.jsx:55 ~ OrderFlow ~ authUser:", authUser);
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 order-progress-bar">
          <div className="aj-drop-shadow background-white p-3 text-center">
            {/* Progress Bar - add 'active' class to the li for the current order flow
                  screen and 'completed' class for completed order flow step screen */}
            <ul className="progress-bar-status p-0">
              <li className="completed d-block d-md-inline-block mb-3 mb-md-0">
                <i className="fi fi-sr-ticket-alt"></i>
                <span>Select Plan</span>
              </li>
              <li className="status-divider d-none d-md-inline-block">
                <hr />
              </li>
              <li className="active d-block d-md-inline-block mb-3 mb-md-0">
                <i className="fi fi-sr-user"></i>
                <span>Register</span>
              </li>
              <li className="status-divider d-none d-md-inline-block">
                <hr />
              </li>
              <li className="d-block d-md-inline-block mb-3 mb-md-0">
                <i className="fi fi-br-id-badge"></i>
                <span>Details</span>
              </li>
              <li className="status-divider d-none d-md-inline-block">
                <hr />
              </li>
              <li className="d-block d-md-inline-block mb-3 mb-md-0">
                <i className="fi fi-sr-credit-card"></i>
                <span>Checkout</span>
              </li>
              <li className="status-divider d-none d-md-inline-block">
                <hr />
              </li>
              <li className="d-block d-md-inline-block mb-3 mb-md-0">
                <i className="fi fi-sr-bowl-rice"></i>
                <span>Select Meals</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-12 order-flow mt-4">
          {/* SELECT PLAN */}
          {selectPlanFlow && (
            <div
              id="selectPlanOrderFlow"
              className="aj-drop-shadow background-white px-3 py-4 min-height-600"
            >
              <h1 className="text-center">Personalize Your Plan</h1>
              <div className="row mt-5">
                <div className="col-md-6 col-12 px-4 py-3 border-right-divider">
                  <h2 className="text-center mb-2">
                    1. What kind of recipes do you like?
                  </h2>
                  <p className="body-text-extra-small text-center">
                    Please select from the options below. You can always change
                    them later.
                  </p>
                  <form id="recipeSelection" className="aj-grid-container my-3">
                    {recipeOptions.map((recipe) => (
                      <div key={recipe.id} className="aj-grid-item">
                        <input
                          type="checkbox"
                          id={recipe.id}
                          name={recipe.name}
                          value={recipe.value}
                          checked={selectedRecipes.includes(recipe.value)}
                          onChange={() => handleCheckboxChange(recipe.value)}
                        />
                        <label
                          className="recipe-name btn btn-primary"
                          htmlFor={recipe.id}
                        >
                          {recipe.name}
                        </label>
                      </div>
                    ))}
                  </form>
                  {/* <h2 className="text-center mb-2">
                    1. What kind of recipes do you like?
                  </h2>
                  <p className="body-text-extra-small text-center">
                    Please select from the options below. You can always change
                    them later.
                  </p>
                  <form id="recipeSelection" className="aj-grid-container my-3">
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe1"
                        name="recipe1"
                        value="Chinese"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe1"
                      >
                        Chinese
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe2"
                        name="recipe2"
                        value="Thai"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe2"
                      >
                        Thai
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe3"
                        name="recipe3"
                        value="Mexican"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe3"
                      >
                        Mexican
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe4"
                        name="recipe4"
                        value="Italian"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe4"
                      >
                        Italian
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe5"
                        name="recipe5"
                        value=""
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe5"
                      >
                        Chinese
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe6"
                        name="recipe6"
                        value="Arabian"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe6"
                      >
                        Arabian
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe7"
                        name="recipe7"
                        value="Regional"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe7"
                      >
                        Regional
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe8"
                        name="recipe8"
                        value="Seasonal"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe8"
                      >
                        Seasonal
                      </label>
                    </div>
                    <div className="aj-grid-item">
                      <input
                        type="checkbox"
                        id="recipe9"
                        name="recipe9"
                        value="BBQ"
                      />
                      <label
                        className="recipe-name btn btn-primary"
                        htmlFor="recipe9"
                      >
                        B.B.Q
                      </label>
                    </div>
                  </form> */}
                  <p className="body-text-extra-small text-center">
                    Win over taste buds of all ages with easy, delicious and
                    crowd-pleasing meals.
                  </p>
                </div>
                <div className="col-md-6 col-12 px-4 py-3 border-left-divider">
                  <h2 className="text-center mb-2">2. Choose your plan size</h2>
                  <p className="body-text-extra-small text-center">
                    We&apos;ll use this as your default plan size, but you can
                    customizeit from week to week.
                  </p>
                  <div className="plan-size plan-size-people d-flex align-items-center justify-content-between my-3">
                    <p className="mb-0">Number of People</p>
                    <div className="d-flex">
                      {peopleOptions.map((option) => (
                        <div key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="planPeople"
                            value={option.value}
                            checked={selectedPeople === option.value}
                            onChange={() => handlePeopleChange(option.value)}
                          />
                          <label
                            className="plan-size-label btn btn-primary w-auto px-4"
                            htmlFor={option.id}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="plan-size plan-size-recipe d-flex align-items-center justify-content-between my-3">
                    <p className="mb-0">Recipe per Week</p>
                    <div className="d-flex">
                      {recipePerWeekOptions.map((option) => (
                        <div key={option.id}>
                          <input
                            type="radio"
                            id={option.id}
                            name="recipePerWeek"
                            value={option.value}
                            checked={selectedRecipePerWeek === option.value}
                            onChange={() =>
                              handleRecipePerWeekChange(option.value)
                            }
                          />
                          <label
                            className="plan-size-label btn btn-primary w-auto px-4"
                            htmlFor={option.id}
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <ProductSummary />
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary aj-button body-text-small fw-700"
                  onClick={goToStep2}
                >
                  Select this Plan
                </button>
              </div>
            </div>
          )}

          {/* REGISTER */}
          {registerFlow && (
            <div
              id="registerOrderFlow"
              className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
            >
              <h1 className="text-center">Register Your Account</h1>
              <div className="row mt-5">
                <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">
                  <p className="body-text-extra-small mb-2">
                    You&apos;ve Selected
                  </p>
                  <h2 className="">
                    4 meals for 3 people per week which is 12 total servings
                  </h2>
                  <div className="text-end d-none d-md-block">
                    <img src="/meals-image.png" />
                  </div>
                </div>
                <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">
                  <form>
                    <input
                      type="email"
                      id="regEmail"
                      name="email"
                      placeholder="Your Email Address"
                      className="form-control mb-3"
                      required
                    />
                    <input
                      type="password"
                      id="regPass"
                      name="password"
                      placeholder="Password"
                      className="form-control mb-3"
                      required
                    />
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="acceptanceCheckbox"
                      />
                      <label
                        className="form-check-label body-text-extra-small fw-medium"
                        htmlFor="acceptanceCheckbox"
                      >
                        Yes, I&apos;d like to receive direct marketing. See our{" "}
                        <a href="#">Privacy Policy</a> for further details.
                      </label>
                    </div>

                    <button
                      className="w-100 btn btn-primary aj-button body-text-small fw-700"
                      onClick={goToStep3}
                    >
                      Continue
                    </button>
                  </form>
                </div>
                <div className="col-12 px-3 py-3 my-0 py-md-0">
                  <div className="text-divider body-text-extra-small">OR</div>
                </div>
                <div className="col-12 px-md-5 px-3 py-3">
                  <div className="row">
                    <div className="col-12 col-md-4 mb-2">
                      <button
                        className="w-100 btn btn-primary aj-button google-button fw-700 px-2 lh-1"
                        onClick={userSignInWithGoogle}
                      >
                        <i className="fi fi-brands-google fs-6 me-2 align-middle lh-1"></i>
                        Continue with Google
                      </button>
                    </div>
                    <div className="col-12 col-md-4 mb-2">
                      <button className="w-100 btn btn-primary aj-button apple-button fw-700 px-2 lh-1">
                        <i className="fi fi-brands-apple fs-6 me-2 align-middle lh-1"></i>
                        Continue with Apple
                      </button>
                    </div>
                    <div className="col-12 col-md-4 mb-2">
                      <button
                        className="w-100 btn btn-primary aj-button facebook-button fw-700 px-2 lh-1"
                        onClick={userSignInWithFacebook}
                      >
                        <i className="fi fi-brands-facebook fs-6 me-2 align-middle lh-1"></i>
                        Continue with Facebook
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-12 px-3 py-3">
                  <div className="row">
                    <div className="col-12 col-md-4 text-center px-3 mt-3">
                      <i className="fi fi-sr-heart fs-4 text-primary"></i>
                      <p className="body-text-small fw-medium mb-1">
                        Something for everyone
                      </p>
                      <p className="body-text-extra-small mb-0">
                        Set dietary preferences then just sit back and let us do
                        the hard yards as we deliver everything you&apos;ll need
                        to cook delicious dinners right to your door.
                      </p>
                    </div>
                    <div className="col-12 col-md-4 text-center px-3 mt-3">
                      <i className="fi fi-sr-restaurant fs-4 text-primary"></i>
                      <p className="body-text-small fw-medium mb-1">
                        Near endless variety
                      </p>
                      <p className="body-text-extra-small mb-0">
                        Each week, our chefs curate 20 deliciously simple
                        recipes featuring a variety of ingredients and flavors.
                      </p>
                    </div>
                    <div className="col-12 col-md-4 text-center px-3 mt-3">
                      <i className="fi fi-ss-soup fs-4 text-primary"></i>
                      <p className="body-text-small fw-medium mb-1">
                        Little effort, big reward
                      </p>
                      <p className="body-text-extra-small mb-0">
                        All you need to do is follow our step-by-step recipe
                        cards and you&apos;ll be eating picture perfect dinners
                        that&apos;ll impress everyone every night.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4"></div>
            </div>
          )}

          {/* Details */}
          {detailFlow && (
            <div
              id="detailOrderFlow"
              className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
            >
              <h1 className="text-center">Let&apos;s Save Your Details</h1>
              <div className="row mt-5">
                <div className="col-12 px-md-5 px-3 my-5">
                  <form className="row">
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        id="deatilFirstName"
                        name="fname"
                        placeholder="First Name*"
                        className="form-control mb-3"
                        required
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        id="deatilLastName"
                        name="lname"
                        placeholder="Last Name*"
                        className="form-control mb-3"
                        required
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="tel"
                        id="deatilPhone"
                        name="phone"
                        placeholder="Phone Number"
                        className="form-control mb-3"
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        id="deatilAddress"
                        name="address"
                        placeholder="Address"
                        className="form-control mb-3"
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        id="deatilCity"
                        name="city"
                        placeholder="City"
                        className="form-control mb-3"
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        id="deatilZip"
                        name="zip"
                        placeholder="Postal Code"
                        className="form-control mb-3"
                        onChange={(e) =>
                          handleInputChange("zip", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6 col-12 mx-auto mt-3">
                      <button
                        className="w-100 btn btn-primary aj-button body-text-small fw-700"
                        onClick={goToStep4}
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-12 px-md-5 px-3">
                  <ProductSummary />
                </div>
              </div>
            </div>
          )}

          {/* Checkout */}
          {checkoutFlow && (
            <div
              id="checkoutOrderFlow"
              className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
            >
              <h1 className="text-center">Payment Details</h1>
              <div className="row mt-5">
                <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">
                  <form className="row">
                    <div className="col-12">
                      <input
                        type="text"
                        id="creditCardNumber"
                        // name="cardNumber"
                        placeholder="Credit Card Number*"
                        className="form-control mb-3"
                        // required
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        id="expiryDate"
                        // name="expiryDate"
                        placeholder="MM/YY*"
                        className="form-control mb-3"
                        // required
                      />
                    </div>
                    <div className="col-md-6 col-12">
                      <input
                        type="text"
                        id="cvcNumber"
                        // name="cvcNumber"
                        placeholder="CVC*"
                        className="form-control mb-3"
                        // required
                      />
                    </div>
                    <div className="col-12">
                      <button
                        className="w-100 btn btn-primary aj-button body-text-small fw-700"
                        onClick={handleButtonClickMyMenu}
                      >
                        Continue
                      </button>
                    </div>
                  </form>

                  <div className="text-divider body-text-extra-small my-3">
                    OR
                  </div>
                  <button className="w-100 btn btn-primary aj-button body-text-small fw-700 background-secondary border-0">
                    <i className="fi fi-brands-paypal fs-6 me-2 align-middle lh-1"></i>{" "}
                    Continue with Paypal
                  </button>
                </div>
                <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">
                  <ProductSummary />
                </div>
                <div className="col-12 px-3 py-3 mt-0 mt-md-4">
                  <div className="row">
                    <div className="col-12 col-md-4 text-center px-3 mt-3">
                      <i className="fi fi-sr-sack-dollar fs-4 text-primary"></i>
                      <p className="body-text-small fw-medium mb-1">
                        Save money
                      </p>
                      <p className="body-text-extra-small mb-0">
                        Spend less on dinner every week.
                      </p>
                    </div>
                    <div className="col-12 col-md-4 text-center px-3 mt-3">
                      <i className="fi fi-sr-surprise fs-4 text-primary"></i>
                      <p className="body-text-small fw-medium mb-1">
                        No surprises
                      </p>
                      <p className="body-text-extra-small mb-0">
                        Pause or skip to fit your schedule
                      </p>
                    </div>
                    <div className="col-12 col-md-4 text-center px-3 mt-3">
                      <i className="fi fi-br-calendar-xmark fs-4 text-primary"></i>
                      <p className="body-text-small fw-medium mb-1">
                        No commitment
                      </p>
                      <p className="body-text-extra-small mb-0">
                        Pause or cancel anytime
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
