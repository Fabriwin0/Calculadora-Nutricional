document.addEventListener('DOMContentLoaded', function() {
    // Retrieve form elements
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const ageInput = document.getElementById('age');
    const genderSelect = document.getElementById('gender');
    const formulaSelect = document.getElementById('formula');
    const activityLevelSelect = document.getElementById('activity-level');
    const fatPercentageContainer = document.getElementById('fat-percentage-container');
    const fatPercentageInput = document.getElementById('fat-percentage');
    const calculateButton = document.getElementById('calculate');
    const bmrContainer = document.getElementById('bmr-container');

    // Verificar si el botón de calcular existe
    if (calculateButton) {
        // Agregar event listener al botón de calcular
        calculateButton.addEventListener('click', calculateTDEE);
    } else {
        console.error("No se encontró el botón 'calculate'.");
    }

    // Mostrar u ocultar el campo de porcentaje de grasa corporal
    formulaSelect.addEventListener('change', function() {
        if (formulaSelect.value === 'cunningham') {
            fatPercentageContainer.style.display = 'block';
        } else {
            fatPercentageContainer.style.display = 'none';
            fatPercentageInput.value = ''; // Limpiar el valor del campo
        }
    });

    // Función para calcular Total Daily Energy Expenditure (TDEE)
    function calculateTDEE(event) {
        event.preventDefault(); // Evitar que el formulario se envíe

        // Retrieve user input values
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        const age = parseInt(ageInput.value);
        const gender = genderSelect.value;
        const formula = formulaSelect.value;
        const activityLevel = parseFloat(activityLevelSelect.value);
        const fatPercentage = parseFloat(fatPercentageInput.value);

        // Validate input
        if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0 || isNaN(age) || age <= 0 || gender === "" || formula === "" || isNaN(activityLevel)) {
            // Display error message if any input is invalid
            bmrContainer.textContent = "Por favor ingrese valores válidos para peso, altura, edad, género, fórmula y nivel de actividad.";
            return;
        }

        // Calculate BMR based on selected formula and gender
        let bmr;
        if (formula === "harris") {
            if (gender === "male") {
                bmr = 66.473 + (13.751 * weight) + (5.003 * height) - (6.755 * age);
            } else {
                bmr = 655.095 + (9.563 * weight) + (1.844 * height) + (4.675 * age);
            }
        } else if (formula === "mifflin") {
            if (gender === "male") {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
            } else {
                bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
            }
        } else if (formula === "cunningham") {
            if (isNaN(fatPercentage) || fatPercentage <= 0 || fatPercentage >= 100) {
                bmrContainer.textContent = "Por favor ingrese un porcentaje de grasa corporal válido para la fórmula de Cunningham.";
                return;
            }
            const lbm = weight * (1 - (fatPercentage / 100));
            bmr = 500 + (22 * lbm);
        }

        // Calculate TDEE
        const tdee = bmr * activityLevel;

        // Display BMR and TDEE
        bmrContainer.textContent = "Su Tasa Metabólica Basal (TMB) es: " + bmr.toFixed(2) + " kcal/día. Su Gasto Energético Diario Total (TDEE) es: " + tdee.toFixed(2) + " kcal/día";
    }
});
