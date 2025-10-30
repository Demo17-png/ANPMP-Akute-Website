// script.js - Debugged and Enhanced

// Waits for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Get the mobile menu toggle button and the navigation list
    const menuToggle = document.querySelector('.menu-toggle');
    const primaryNavigation = document.getElementById('primary-navigation');

    // Add a click event listener to the menu toggle button
    if (menuToggle && primaryNavigation) {
        menuToggle.addEventListener('click', () => {
            // Check if the navigation is currently visible by checking the 'data-visible' attribute
            const isVisible = primaryNavigation.getAttribute('data-visible') === 'true';

            // Toggle the 'data-visible' attribute
            primaryNavigation.setAttribute('data-visible', !isVisible);
            
            // Toggle the 'aria-expanded' attribute for accessibility purposes
            menuToggle.setAttribute('aria-expanded', !isVisible);
        });

        // Close menu when a link is clicked (good for mobile UX)
        primaryNavigation.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                primaryNavigation.setAttribute('data-visible', 'false');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // =======================================================
    // Members Page Logic (Only runs on members.html)
    // =======================================================
    const yearbookContainer = document.getElementById("yearbook");
    const searchInput = document.getElementById("search");

    if (yearbookContainer && searchInput) {
        const students = [
            // ... (Your existing students array remains here) ...
            { name: "Dr Omotunde Green", facility: "Christabiks Hospital ", bio: "37, Oke Aro road, Enilolobo bus stop.", photo: "./dromotunde.jpg" },
            { name: "Dr Anyanti Vincent Chijindu", facility: "Total Health Hospital", bio: "1 Hamzat Close (Temidire Estate) Alagbole, Akute.", photo: "./dranyanti.jpg" },
            { name: "Dr Aiyelotan Oluwatoyin Modupe ", facility: "Iyiola Medical Consult ", bio: "4, Adebiyi shittu Street, Okanlawon bus stop, olambe inside behind Conoil petrol station Olambe road.", photo: "./draiyelotan.jpg" },
            { name: "Dr Temitope Mackson Olumuyiwa", facility: "Cornerstone Hospital", bio: "5 Winsala Close, Opposite Royal Crown, Arifanla, Akute.", photo: "./drmackson.jpg" },
            { name: "Dr Sobande Olumide Tunde", facility: "Emmanuel Hospital and Maternity Home", bio: "No, 6, Unity Avenue Olori Akute", photo: "./drsobande2.jpg" },
            { name: "Dr Ademola Orolu", facility: "Nathaniel Health Consulting", bio: "23b, Badaru Street, Agbo-Igbala Bus Stop, Matogbun, Ifo.", photo: "./drorolu.jpg" },
            { name: "Dr Oladapo Rufus AyenI ", facility: "Day Medicare Hospital Alagbole ", bio: "1 Olorunisola Close off Alagbole-Akute.", photo: "./drayeni.jpg" },
            { name: "Tendalife Specialist Hospital", facility: "Tendalife Specialist Hospital ", bio: "10, Wilson Araromi Street, Mubarak, Akute.", photo: "./femaledoctor.jpg" }, // Name adjusted for search
            { name: "Dr Olaitan Omotayo Ogundiran", facility: "Bofap Hospital", bio: "No 10, Wale Osoba close, Martins, Akute.", photo: "./drogundiran2.png" },
            { name: "Dr Kadri Monsurat Omotayo Adunni", facility: "Kamyk Hospital Limited", bio: "5, Bolajoko Pitan Street, Off Abudu Obayomi street, Yakoyo Bus Stop, Ifo LGA.", photo: "./drkadri2.jpg" }, // Name adjusted for search
            { name: "Dr Dosumu Olarewaju Abiola", facility: "AJ Rapha Diagnostic Centre", bio: "(1)Popoola shopping complex suite 10 Ajibose B/Stop Oke Aro Rd Giwa, (2)10 Bashiru Street Ojodu B/Stop Ojodu", photo: "./drdosumu.jpg" },
            { name: "Dr Tunde Agboola", facility: "Agboola Hospital", bio: "100 Ajuwon -Ayawoele Rd opposite Ajuwon Health Center besides AP Petrol Station", photo: "./maledoctor.jpg" },
            { name: "Dr Egbunu Samson Eleojo", facility: "Samsteve Hospital", bio: "2, Abule-Ojo Road, by Abule-Ojo B/Stop, Alagbole. ", photo: "./maledoctor.jpg" },
            { name: "Dr Christopher (Effiwat) Andem-Ewa", facility: "Ewa Hospital", bio: "18, Olasepe  Estate, Denro Ojodu, Ifo-Lga, Ogun State ", photo: "./maledoctor.jpg" },
            { name: "Dr Funmi Jokodola", facility: "Victory Dental Clinic & Services", bio: "Old 46. New 3. Surulere Street. Cele Bus stop. Alagbole", photo: "./femaledoctor.jpg" },
            { name: "Dr Popoola Olusegun Michael", facility: "Mike Medics Hospital", bio: "Aduba-Estate, Akinbo-Akute", photo: "./drpopoola.jpg" },
            { name: "Dr Abulu Omon-Areloje Simeon", facility: "Goodluck Hospital and Maternity Home Ltd", bio: "No. 4 The Light Close, Mercy Estate, Akute", photo: "./drabulu.jpg" },
            { name: "Dr Ademola Oluwaseun Adewusi", facility: "Broadland Hospital Services Ltd", bio: "46, Makogi Road, Ajegunle, Magboro", photo: "./dradewusi.jpg" },
            { name: "Dr Oyetunde Ajiboye Matthew", facility: "Bode Medical Centre", bio: "29, Akute-Odo Road, Akute, Ogun State", photo: "./maledoctor.jpg" },
            { name: "Dr Omolade Gbadebo Marquis", facility: "OGM Hospital", bio: "5, Adenle Street, Off Yomdok Bus Stop, Off Ijoko Road, Akute", photo: "./drmacquis.jpg" },  
            { name: "Dr Hally Oluwawemimo Sarah", facility: "Kingsword Hospital", bio: "No 1, Akinlabi Street, Oyeyemi Bus Stop, Ajuwon Road", photo: "./femaledoctor.jpg" },
            { name: "Dr Ajanlekoko Dolapo Richard", facility: "Kingsmith Specialist Hospital", bio: "100, Ojodu Road, Akute, Ogun State", photo: "./drajanlekoko.jpg" },
            { name: "Dr Olayiwola Owolabi", facility: "Vital Hospital", bio: "27, Olambe Road, Olambe, Ifo L G., Ogun State, Nigeria.", photo: "./maledoctor.jpg" },
            { name: "Dr Essien James Ndarake", facility: "Canon Hospital", bio: "9, Ogunnusi Avenue, Maghoro, Ogun State", photo: "./drjamesessien.jpg" },
            { name: "Chief Dr Patrick Oghoghorie", facility: "Alheri Hospital", bio: "10, Ojodu Abiodun Road, Ojodu Berger", photo: "./maledoctor.jpg" },
            { name: "Dr Ademola Adrian Ayodele", facility: "Strong Tower Specialist Hospital and Fertility Centre", bio: "100, Agbado road, Giwa, Oke-Aro", photo: "./maledoctor.jpg" },
            { name: "Dr Sylvanus Jatto", facility: "Faithshield Hospital", bio: "15, Gasline Road, Gasline CDA Estate, Magboro", photo: "./maledoctor.jpg" },
            { name: "Dr Awusa Clifford Fukpode", facility: "Tamara Medical Centre", bio: "No 20, Akute-Ajuwon Road, Akute, Ogun state", photo: "./drawusa2.jpg" },
            
        ];

        function loadYearbook(filtered = students) {
            yearbookContainer.innerHTML = "";
            if (filtered.length === 0) {
                yearbookContainer.innerHTML = "<p style='text-align:center; grid-column: 1 / -1; font-size: 1.2em; padding: 20px;'>No member found matching your search criteria.</p>";
                return;
            }
            filtered.forEach(student => {
            yearbookContainer.innerHTML += `
                <div class="student-card">
                <img src="${student.photo}" alt="${student.name}">
                <h2>${student.name}</h2>
                <p><strong>Facility:</strong> ${student.facility}</p>
                <p>${student.bio}</p>
                </div>
            `;
            });
        }

        // Initial load
        loadYearbook();

        // Search functionality
        searchInput.addEventListener("input", function() {
            const keyword = this.value.toLowerCase();
            const filtered = students.filter(s => 
                s.name.toLowerCase().includes(keyword) || 
                s.facility.toLowerCase().includes(keyword)
            ); // Added facility search
            loadYearbook(filtered);
        });
    }
});
