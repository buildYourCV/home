
document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here, or call a function
    (function App() {
        let bcvElement = document.getElementById('bCVMenuLink')
        bcvElement.addEventListener('click', handleBCVOnClick);
        let aboutElement = document.getElementById('aboutMenuLink');
        aboutElement.addEventListener('click', handleAboutOnClick);
    })();
});

const handleHomeOnClick= () => {
    showHidePage('homeDiv');
}

const handleBCVOnClick = (e) => {
    showHidePage('bcvDiv', e);
}

const handleGMCVOnClick = () => {
    showHidePage('gmcvDiv')
}

const handleAboutOnClick = (e)=>  {
    showHidePage('aboutDiv', e);
}

const showHidePage = (thisPageId, e) => {
    try {
        let thisPage = document.getElementById(thisPageId)
        thisPage.style.display = 'block';
        // e && e.target && e.target.classList.add('active');
        let allPagesList = getPagesList();
        allPagesList.map((item) => {
            if (item !== thisPageId) {
                document.getElementById(item).style.display = 'none';
            }
        });
    } catch (err) {
        console.error('Exception error', err);
    }
}

const getPagesList = () => {
    return ['homeDiv', 'bcvDiv', 'gmcvDiv', 'aboutDiv'];
}
