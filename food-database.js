// Complete Food Database - Based on Diet Plan
const FOOD_DATABASE = [
    // BREAKFAST MAINS
    { name: 'Poha', category: 'Breakfast Main', protein: 6.6, carbs: 76.9, fats: 1.5, calories: 340 },
    { name: 'Oats', category: 'Breakfast Main', protein: 13.0, carbs: 64.0, fats: 7.0, calories: 380 },
    { name: 'Idli', category: 'Breakfast Main', protein: 3.6, carbs: 22.7, fats: 0.9, calories: 118 },
    { name: 'Upma (Sooji)', category: 'Breakfast Main', protein: 11.0, carbs: 73.0, fats: 0.6, calories: 348 },
    { name: 'Dalia', category: 'Breakfast Main', protein: 11.5, carbs: 71.0, fats: 1.8, calories: 340 },
    { name: 'Brown Bread', category: 'Breakfast Main', protein: 9.0, carbs: 42.0, fats: 2.5, calories: 220 },
    
    // MILK
    { name: 'Milk', category: 'Milk', protein: 3.5, carbs: 5.0, fats: 1.5, calories: 45 },
    
    // FRUITS
    { name: 'Banana', category: 'Fruit', protein: 1.3, carbs: 27.0, fats: 0.4, calories: 105 },
    { name: 'Apple', category: 'Fruit', protein: 0.3, carbs: 14.0, fats: 0.2, calories: 52 },
    { name: 'Papaya', category: 'Fruit', protein: 0.6, carbs: 11.0, fats: 0.1, calories: 43 },
    { name: 'Orange', category: 'Fruit', protein: 0.9, carbs: 12.0, fats: 0.1, calories: 47 },
    { name: 'Pomegranate', category: 'Fruit', protein: 1.7, carbs: 19.0, fats: 1.2, calories: 83 },
    { name: 'Guava', category: 'Fruit', protein: 2.6, carbs: 14.0, fats: 1.0, calories: 68 },
    { name: 'Sweet Lime', category: 'Fruit', protein: 0.8, carbs: 9.0, fats: 0.3, calories: 43 },
    { name: 'Kiwi', category: 'Fruit', protein: 1.1, carbs: 15.0, fats: 0.5, calories: 61 },
    { name: 'Pear', category: 'Fruit', protein: 0.4, carbs: 15.0, fats: 0.1, calories: 57 },
    { name: 'Watermelon', category: 'Fruit', protein: 0.6, carbs: 8.0, fats: 0.2, calories: 30 },
    { name: 'Mango', category: 'Fruit', protein: 0.8, carbs: 15.0, fats: 0.4, calories: 60 },
    
    // NUTS
    { name: 'Peanuts', category: 'Nuts', protein: 26.0, carbs: 16.0, fats: 49.0, calories: 567 },
    { name: 'Mixed Nuts', category: 'Nuts', protein: 16.0, carbs: 11.0, fats: 64.0, calories: 684 },
    { name: 'Peanut Butter', category: 'Nuts', protein: 25.0, carbs: 20.0, fats: 50.0, calories: 590 },
    { name: 'Almonds', category: 'Nuts', protein: 21.0, carbs: 22.0, fats: 50.0, calories: 576 },
    { name: 'Cashews', category: 'Nuts', protein: 18.0, carbs: 30.0, fats: 44.0, calories: 553 },
    { name: 'Walnuts', category: 'Nuts', protein: 15.0, carbs: 14.0, fats: 65.0, calories: 654 },
    
    // GRAINS
    { name: 'Rice (White)', category: 'Grain', protein: 7.0, carbs: 78.0, fats: 0.7, calories: 345 },
    { name: 'Rice (Brown)', category: 'Grain', protein: 7.5, carbs: 76.0, fats: 2.0, calories: 350 },
    { name: 'Wheat Roti', category: 'Grain', protein: 11.8, carbs: 69.0, fats: 1.7, calories: 340 },
    { name: 'Jowar Roti', category: 'Grain', protein: 10.4, carbs: 67.7, fats: 1.9, calories: 329 },
    { name: 'Bajra Roti', category: 'Grain', protein: 11.6, carbs: 67.5, fats: 5.0, calories: 361 },
    { name: 'Ragi Roti', category: 'Grain', protein: 7.3, carbs: 72.0, fats: 1.3, calories: 328 },
    { name: 'Quinoa', category: 'Grain', protein: 14.0, carbs: 64.0, fats: 6.0, calories: 368 },
    
    // DALS/PULSES
    { name: 'Moong Dal', category: 'Dal', protein: 24.0, carbs: 63.0, fats: 1.2, calories: 347 },
    { name: 'Masoor Dal', category: 'Dal', protein: 25.1, carbs: 60.1, fats: 1.1, calories: 343 },
    { name: 'Toor Dal', category: 'Dal', protein: 22.3, carbs: 60.9, fats: 1.5, calories: 335 },
    { name: 'Chana Dal', category: 'Dal', protein: 22.5, carbs: 57.2, fats: 6.0, calories: 372 },
    { name: 'Urad Dal', category: 'Dal', protein: 25.2, carbs: 59.6, fats: 1.4, calories: 341 },
    { name: 'Chole', category: 'Dal', protein: 19.0, carbs: 61.0, fats: 6.1, calories: 364 },
    { name: 'Rajma', category: 'Dal', protein: 22.9, carbs: 60.3, fats: 0.8, calories: 333 },
    { name: 'Whole Moong', category: 'Dal', protein: 24.0, carbs: 63.0, fats: 1.2, calories: 347 },
    
    // MAIN PROTEINS
    { name: 'Paneer', category: 'Main Protein', protein: 18.0, carbs: 3.0, fats: 22.0, calories: 282 },
    { name: 'Tofu', category: 'Main Protein', protein: 12.0, carbs: 2.0, fats: 6.0, calories: 94 },
    { name: 'Soy Chunks', category: 'Main Protein', protein: 54.0, carbs: 36.0, fats: 1.4, calories: 326 },
    
    // VEGETABLES
    { name: 'Mixed Vegetables', category: 'Vegetables', protein: 1.6, carbs: 6.6, fats: 0.2, calories: 29 },
    { name: 'Spinach', category: 'Vegetables', protein: 2.9, carbs: 3.6, fats: 0.4, calories: 23 },
    { name: 'Potato', category: 'Vegetables', protein: 2.0, carbs: 17.0, fats: 0.1, calories: 77 },
    { name: 'Cauliflower', category: 'Vegetables', protein: 1.9, carbs: 5.0, fats: 0.3, calories: 25 },
    { name: 'Green Beans', category: 'Vegetables', protein: 1.8, carbs: 7.0, fats: 0.1, calories: 31 },
    { name: 'Carrot', category: 'Vegetables', protein: 0.9, carbs: 10.0, fats: 0.2, calories: 41 },
    { name: 'Broccoli', category: 'Vegetables', protein: 2.8, carbs: 7.0, fats: 0.4, calories: 34 },
    
    // CURD/DAIRY
    { name: 'Curd', category: 'Curd', protein: 4.0, carbs: 4.4, fats: 3.1, calories: 62 },
    { name: 'Buttermilk', category: 'Curd', protein: 3.0, carbs: 4.5, fats: 0.5, calories: 40 },
    
    // PRE-WORKOUT CARBS
    { name: 'Banana (Pre-workout)', category: 'Pre-Workout', protein: 1.3, carbs: 27.0, fats: 0.4, calories: 105 },
    { name: 'Apple + Dates', category: 'Pre-Workout', protein: 0.5, carbs: 24.0, fats: 0.2, calories: 95 },
    { name: 'Light Poha', category: 'Pre-Workout', protein: 6.6, carbs: 76.9, fats: 0.5, calories: 330 },
    { name: 'Brown Bread + Jam', category: 'Pre-Workout', protein: 8.0, carbs: 55.0, fats: 2.0, calories: 265 },
    { name: 'Orange Juice', category: 'Pre-Workout', protein: 0.7, carbs: 11.0, fats: 0.2, calories: 45 },
    { name: 'Raisins + Dates', category: 'Pre-Workout', protein: 2.0, carbs: 78.0, fats: 0.4, calories: 295 },
    
    // POST-WORKOUT
    { name: 'Whey Protein', category: 'Whey', protein: 80.0, carbs: 10.0, fats: 5.0, calories: 410 },
    { name: 'Banana (Post-workout)', category: 'Post-Carb', protein: 1.3, carbs: 27.0, fats: 0.4, calories: 105 },
    { name: 'Dates', category: 'Post-Carb', protein: 2.5, carbs: 75.0, fats: 0.4, calories: 282 },
    { name: 'Raisins', category: 'Post-Carb', protein: 3.0, carbs: 79.0, fats: 0.5, calories: 299 },
    { name: 'Honey', category: 'Post-Carb', protein: 0.3, carbs: 82.0, fats: 0.0, calories: 304 },
    
    // BEFORE BED
    { name: 'Turmeric Milk', category: 'Before Bed', protein: 3.5, carbs: 6.0, fats: 1.5, calories: 50 },
    { name: 'Plain Curd (Bed)', category: 'Before Bed', protein: 4.0, carbs: 4.4, fats: 3.1, calories: 62 },
    { name: 'Casein Protein', category: 'Before Bed', protein: 78.0, carbs: 8.0, fats: 2.0, calories: 360 }
];

// Meal targets by week
const TARGETS = {
    '1-2': {
        breakfast: { protein: 30, carbs: 75 },
        lunch: { protein: 40, carbs: 110 },
        preworkout: { carbs: 30 },
        postworkout: { protein: 25, carbs: 25 },
        dinner: { protein: 30, carbs: 80 },
        daily: { protein: 130, carbs: 300, calories: 2200 }
    },
    '3-4': {
        breakfast: { protein: 30, carbs: 75 },
        lunch: { protein: 40, carbs: 110 },
        preworkout: { carbs: 30 },
        postworkout: { protein: 25, carbs: 25 },
        dinner: { protein: 30, carbs: 80 },
        daily: { protein: 135, carbs: 325, calories: 2350 }
    },
    '5-6': {
        breakfast: { protein: 30, carbs: 75 },
        lunch: { protein: 40, carbs: 110 },
        preworkout: { carbs: 30 },
        postworkout: { protein: 25, carbs: 25 },
        dinner: { protein: 30, carbs: 80 },
        daily: { protein: 140, carbs: 350, calories: 2500 }
    }
};
