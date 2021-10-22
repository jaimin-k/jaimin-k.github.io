var CollapsibleMenu = {
  init: function (parent) {
    var menu = parent; // 'parent' is the argument sent with the init function
    var menuHeight = menu.innerHeight(); // Measure the height of the menu - this is important as it will detect if the menu overflows
    var maxMenuHeight = 50; // A static number in px that the menu won't overflow normally, but will overflow when there are too many items. Usually a wee bit higher than `menuHeight`

    if (menuHeight >= maxMenuHeight) {// If overflowing...
      while (menuHeight > maxMenuHeight) {
        var children = menu.children('li:not(:last-child)'); // Don't count our 'More' dropdown
        var count = children.length; // Count items

        // Create the new menu item.
        var item = $(children[count - 1]);
        var newMenuItem = '<a class="dropdown-item" href="' + item.children('a').attr('href') + '">' + item.text() + '</a>'; // Markup of our new dropdown item

        // Prepend the new menu item to the collapsed menu list
        menu.find('.collapsed-items').prepend(newMenuItem);

        // Remove the menu item from the main area
        item.remove();

        // Reset the height
        menuHeight = menu.innerHeight();
      }
    } else
    {// If not overflowing
      var count = 0;
      while (menuHeight < maxMenuHeight && menu.children('li').length > 0 && count++ < 20) {// 20 is an absurd number, however, this example is also extreme
        var collapsed = menu.find('.collapsed-items').children('a'); // Find our collapsed elements
        var count = collapsed.length; // Count our collapsed elements

        if (count) {// If there are elements
          // Create the new item
          var item = $(collapsed[0]);
          var newMenuItem = '<li class="nav-item">\n<a href="' + item.attr('href') + '" class="nav-link">' + item.text() + '</a>\n</li>'; // Markup of our new menu item

          // Insert the new item into the collapsed menu area
          menu.children('li.collapsed-menu').before(newMenuItem);

          // Remove the item from the nav list
          item.remove();

          // Reset height
          menuHeight = menu.innerHeight();
        } else
        {// If there are no elements
          break;
        }
      }

      if (menuHeight > maxMenuHeight) {// If the height overflows
        // ...then init
        CollapsibleMenu.init(parent);
      }
    }

    // Hide the collapsed menu list if no items are present
    if (!menu.find('.collapsed-items').children('a').length) {
      menu.find('.collapsed-menu').hide();
    } else {
      menu.find('.collapsed-menu').show();
    }
  } };


$(function () {
  // In both functions below, `.nav` is the `parent`    
  CollapsibleMenu.init($('.container .nav'));

  // Re-init on window resize
  $(window).resize(function () {
    CollapsibleMenu.init($('.container .nav'));
  });
});