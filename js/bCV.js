let seletedTemplate = 'radio_template1';

document.addEventListener('DOMContentLoaded', function () {
    // Your JavaScript code here, or call a function
    // localStorage.setItem('bcvUserData', {});
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
    document.getElementById('bcvForm1').style.display = 'block';
    document.getElementById('bcvForm2').style.display = 'none';
    handleBuildResume();
}

const handleGMCVOnClick = () => {
    showHidePage('gmcvDiv')
}

const handleAboutOnClick = (e) => {
    showHidePage('aboutDiv', e);
}

const showHidePage = (thisPageId) => {
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
            
            showHidePage('bcvDiv');
        }
        else {
            alert('Please choose another template.');
        }
    } catch (err) {
        console.error('Exception error ', err);

    }
}

const handleAddSummary = () => {
    try {
        let summaryConatiner = document.getElementById('summaryContainer');
        let elemntCount = summaryConatiner.querySelectorAll('input').length;
        if (elemntCount < 5) {
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'text');
            newInput.setAttribute('placeholder', 'Summary');
            newInput.setAttribute('id', 'summaryField' + (elemntCount+1));
            newInput.setAttribute('class', 'form-control');
            summaryConatiner.appendChild(document.createElement('br'));
            summaryConatiner.appendChild(newInput);
        } else {
            alert('Sorry! More than 5 not allowed.');
        }
    } catch (err) {
        console.error(err);
    }

}

const getCareerSummaryForm = (rank) =>{
    return `<section id='${rank}'><br/><label for="fromDate${rank}">From Date (Select Month and Year):</label> <input type="month" id='fromDate${rank}' name="fromDate${rank}" class="form-control"><br /><label for="toDate${rank}">To Date (Select Month and Year): &nbsp; &nbsp;<input id="tillDateChk_${rank}" type="checkbox" onclick="handleTillPresentCheck('toDate${rank}', 'tillDateChk_${rank}')"> till present</input></label><input type="month" class="form-control" id="toDate${rank}" name="toDate${rank}"><br /><input placeholder="Enter Designation and Company Name" class="form-control" id="designationAndCompany${rank}" /></section>`;
}

//cSummaryForm
const handleAddCareerSummary = () =>{
    try {
        let cSummaryConatiner = document.getElementById('cSummaryForm');
        let elemntCount = document.getElementById('bcvForm2').querySelectorAll('section').length;
        if (true) {
            cSummaryConatiner.insertAdjacentHTML('beforeend', getCareerSummaryForm(elemntCount+1));
        } else {
            alert('Sorry! More than 5 not allowed.');
        }
    } catch (err) {
        console.error(err);
    }
}

const handleTillPresentCheck = (dFieldId, chkId) => {
    let cSummaryConatiner = document.getElementById('bcvForm2');
    let sectionCount = cSummaryConatiner.querySelectorAll('section').length;
    let toDatePicker = document.getElementById(dFieldId);
    let chkToDate = document.getElementById(chkId);
    if (chkToDate.checked) {
        toDatePicker.disabled = true;
        document.getElementById('cSummaryAddLink').disabled = true;
    } else {
        toDatePicker.disabled = false;
        document.getElementById('cSummaryAddLink').disabled = false;
    }
    let checkedBoxRank = parseInt(chkId.split('_')[1]);
    if(sectionCount > checkedBoxRank){
        for (let i = checkedBoxRank + 1; i <= sectionCount; i++) {
            const elementToRemove = document.getElementById(i);
            if (elementToRemove) {
                elementToRemove.remove();
            }
        }
    }

}

const handleContinue = () => {
    let bcvUserResumeData = {};
    let formFieldIds = ['fnField', 'lnField', 'mobField', 'emailField'];
    let summaryConatiner = document.getElementById('summaryContainer');
    let elementCount = summaryConatiner.querySelectorAll('input').length;
    for (let i = 1; i <= elementCount; i++) {
        formFieldIds.push('summaryField' + i)
    }
    formFieldIds.forEach((item)=> {
        bcvUserResumeData[item] = getUserInput(item);
    });

    localStorage.setItem('bcvUserData', JSON.stringify(bcvUserResumeData));
    document.getElementById('bcvForm1').style.display = 'none';
    document.getElementById('bcvForm2').style.display = 'block';
}

const getUserInput = (id) => {
    return document.getElementById(id).value;
}
