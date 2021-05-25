const page_container = document.getElementById('members_page_container');
const notes_container = document.querySelector('.notes');
const personal_billing_agreement_container = document.getElementById('personal_billing_agreement_absolute-container');
const purchase_items_absolute_container = document.getElementById('purchase_items_absolute_container');

const margin_between_cells = 24;

function CheckBoundaries(parentElem, childElem) {
    const parentRect = parentElem.getBoundingClientRect();
    const childRect = childElem.getBoundingClientRect();

    return parentRect.bottom <= childRect.bottom;
}

const set_container_positions = () => {
    if (document.body.clientWidth > 768) {
        const top_1 = notes_container.clientHeight + margin_between_cells;
        personal_billing_agreement_container.style.position = 'absolute';
        personal_billing_agreement_container.style.top = top_1.toString();
        personal_billing_agreement_container.style.right = '0';

        const top_2 = personal_billing_agreement_container.style.top + personal_billing_agreement_container.clientHeight + margin_between_cells;
        purchase_items_absolute_container.style.position = 'absolute';
        purchase_items_absolute_container.style.top = top_2.toString();
        purchase_items_absolute_container.style.right = '0';

        if (CheckBoundaries(page_container, purchase_items_absolute_container)) {
            page_container.style.cssText = `height:calc(${page_container.clientHeight} 
            + 
            ${purchase_items_absolute_container.getBoundingClientRect().bottom - page_container.getBoundingClientRect().bottom}) 
            !important`;
        }
    }

    if (document.body.clientWidth < 767) {
        personal_billing_agreement_container.style.position = 'relative';
        personal_billing_agreement_container.style.top = '0';
        personal_billing_agreement_container.style.right = '0';

        purchase_items_absolute_container.style.position = 'relative';
        purchase_items_absolute_container.style.top = '0';
        purchase_items_absolute_container.style.right = '0';

        page_container.style.cssText = 'height:100% !important';
    }
}

document.addEventListener('resize', set_container_positions);

window.addEventListener('beforeunload', function (e) {
    document.removeEventListener('resize', set_container_positions);
});