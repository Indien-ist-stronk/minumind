document.addEventListener('DOMContentLoaded', () => {
    // Profile Form
    const profileForm = document.getElementById('profile-form');
    const totalPointsDisplay = document.getElementById('total-points');
    const weeklyPointsDisplay = document.getElementById('weekly-points');

    // Quiz Form
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    // Load profile data from localStorage
    const loadProfileData = () => {
        const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
        if (profileData.name) document.getElementById('name').value = profileData.name;
        if (profileData.email) document.getElementById('email').value = profileData.email;
        if (profileData.phone) document.getElementById('phone').value = profileData.phone;
        if (profileData.classSection) document.getElementById('class-section').value = profileData.classSection;
        if (profileData.totalPoints) totalPointsDisplay.textContent = profileData.totalPoints;
        if (profileData.weeklyPoints) weeklyPointsDisplay.textContent = profileData.weeklyPoints;
    };

    // Save profile data to localStorage
    const saveProfileData = (e) => {
        e.preventDefault();
        const profileData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            classSection: document.getElementById('class-section').value,
            totalPoints: totalPointsDisplay.textContent,
            weeklyPoints: weeklyPointsDisplay.textContent
        };
        localStorage.setItem('profileData', JSON.stringify(profileData));
    };

    // Update points based on quiz results
    const updatePoints = (points) => {
        let totalPoints = parseInt(totalPointsDisplay.textContent);
        let weeklyPoints = parseInt(weeklyPointsDisplay.textContent);

        totalPoints += points;
        weeklyPoints += points;

        totalPointsDisplay.textContent = totalPoints;
        weeklyPointsDisplay.textContent = weeklyPoints;

        // Save updated points to localStorage
        const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
        profileData.totalPoints = totalPoints;
        profileData.weeklyPoints = weeklyPoints;
        localStorage.setItem('profileData', JSON.stringify(profileData));
    };

    // Handle quiz form submission
    const submitQuiz = (e) => {
        e.preventDefault();
        let totalPoints = 0;
        const formData = new FormData(quizForm);

        for (let entry of formData.entries()) {
            totalPoints += parseInt(entry[1], 10);
        }

        // Display the result
        quizResult.textContent = `You have scored ${totalPoints} points!`;

        // Update points
        updatePoints(totalPoints);

        // Clear the form
        quizForm.reset();
    };

    profileForm && profileForm.addEventListener('submit', saveProfileData);
    quizForm && quizForm.addEventListener('submit', submitQuiz);

    loadProfileData();
});