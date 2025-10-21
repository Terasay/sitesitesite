
document.addEventListener('DOMContentLoaded', function() {
    var deliveryLink = document.getElementById('delivery-link');
    if (deliveryLink) {
        deliveryLink.addEventListener('click', function(e) {
            e.preventDefault();
            var url = deliveryLink.getAttribute('data-map-url');
            window.open(url, 'deliveryMap', 'width=500,height=400,menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes');
        });
    }
});
