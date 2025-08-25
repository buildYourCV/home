var seletedTemplate = 'radio_template1';

document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here, or call a function
    (function App() {
        let bcvElement = document.getElementById('bCVMenuLink')
        bcvElement.addEventListener('click', handleBCVOnClick);
        let aboutElement = document.getElementById('aboutMenuLink');
        aboutElement.addEventListener('click', handleAboutOnClick);

        const imageRadios = document.querySelectorAll('input[name="image"]');

        imageRadios.forEach(radio => {
            radio.addEventListener('change', function (event) {
                if (event.target.checked) {
                    seletedTemplate = event.target.id;
                }
            });
        });
    })();
});

const handleHomeOnClick = () => {
    showHidePage('homeDiv');
}

const handleBCVOnClick = (e) => {
    showHidePage('bcvDiv', e);
    handleBuildResume();
}

const handleGMCVOnClick = () => {
    showHidePage('gmcvDiv')
}

const handleAboutOnClick = (e) => {
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


function openImage() {
    try {
        let src;
        if (!seletedTemplate.split('_')[1]) {
            src = './images/NoPreview.jpg';
        } else {
            let templateName = seletedTemplate.split('_')[1];
            src = './images/' + templateName + '/' + templateName + '_1.jpg';
        }
        document.getElementById("popupImg").src = src;
        document.getElementById("overlay").style.display = "flex";

    } catch (err) {
        console.error('Exception in open image ', err)
    }
}

function closeImage() {
    document.getElementById("overlay").style.display = "none";
}

const handleBuildResume = () => {
    try {
        if (['radio_template1', 'radio_template2'].includes(seletedTemplate)) {
            let templateName = seletedTemplate.split('_')[1];
            document.getElementById('bCVMenuLink').click();
            src = './images/' + templateName + '/' + templateName + '_1.jpg';
            document.getElementById('selectedTemplateImg').src = src;
        }
        else {
            alert('Please choose another template.');
        }
    } catch (err) {
        console.error('Exception error ', err);

    }
}
