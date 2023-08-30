$(document).ready(function() {
    // Initialize Isotope
    var $grid = $('#portfolio-grid').isotope({
      itemSelector: '.tt-grid-item',
      layoutMode: 'fitRows'
    });
    
    // Filter the grid to show only 'ux' projects by default
    $grid.isotope({ filter: '.ux' });
    
    // Handle click events on filter links
    $('.ttgr-cat-classic-item a').on('click', function() {
      var filterValue = $(this).attr('data-filter');
      
      if (filterValue === '.all') {
        $grid.isotope({ filter: '*' }); // Show all projects
      } else {
        $grid.isotope({ filter: filterValue }); // Filter projects by selected category
      }
    });
  });