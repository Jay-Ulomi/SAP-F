# Sales Module UI Update Plan

## Overview
This document outlines the UI improvements to be applied across all sales module submodules, based on the improvements made to `QuotationsView.vue`.

## UI Improvements to Apply

### 1. Filter Section Updates
- **Remove**: Separate filter container section with advanced filters
- **Add**: Filters in table header section (single row layout)
- **Keep**: Only essential filters (Search, Type, Status)
- **Remove**: Redundant customer filter (search handles it)
- **Update**: Search placeholder to indicate it searches multiple fields

### 2. Table Improvements
- **Sticky Header**: Add `sticky top-0 z-10` to `<thead>`
- **Clickable Rows**: Add `@click` handler to open detail view
- **Row Hover**: Add `cursor-pointer transition-colors` classes
- **Icon Action Buttons**: Replace text buttons with icon buttons
  - View: Eye icon (blue)
  - Edit: Pencil icon (indigo)
  - Delete: Trash icon (red)
- **Button Styling**: Add hover backgrounds and tooltips
- **Event Handling**: Add `@click.stop` to action buttons to prevent row click

### 3. Table Container
- **Scrolling**: Add `max-h-[calc(100vh-400px)]` and `overflow-auto`
- **Better UX**: Improved scrolling experience

## Views to Update

### Priority 1 (High Traffic)
1. ✅ **QuotationsView.vue** - COMPLETED
2. **OrdersView.vue** - Sales Orders
3. **ArInvoicesView.vue** - A/R Invoices
4. **DeliveriesView.vue** - Deliveries

### Priority 2 (Medium Traffic)
5. **CreditMemosView.vue** - Credit Memos
6. **ReturnsView.vue** - Returns
7. **IncomingPaymentsView.vue** - Incoming Payments

### Priority 3 (Lower Traffic)
8. **DunningView.vue** - Dunning
9. **PaymentsView.vue** - Payments
10. **SalesReportsView.vue** - Sales Reports

## Implementation Checklist for Each View

### Filter Updates
- [ ] Remove filter container section (lines with "<!-- Filters -->")
- [ ] Remove advanced filters section
- [ ] Remove active filters summary
- [ ] Move Search, Type, Status filters to table header
- [ ] Update search placeholder text
- [ ] Remove customer filter (if exists)
- [ ] Update filter logic to remove customer filter references
- [ ] Add "Clear Filters" button in header (conditional on active filters)

### Table Updates
- [ ] Add sticky header class to `<thead>`
- [ ] Add clickable row functionality
- [ ] Update action buttons to use icons
- [ ] Add `@click.stop` to action buttons
- [ ] Add hover effects and transitions
- [ ] Update table container with max-height and overflow

### Code Cleanup
- [ ] Remove unused filter variables
- [ ] Update `hasActiveFilters` computed property
- [ ] Update filter methods
- [ ] Remove `showAdvancedFilters` variable (if exists)

## Common Patterns

### Filter Row Structure
```vue
<!-- Search and Filters Row -->
<div class="flex flex-wrap items-end gap-4">
  <div class="flex-1 min-w-[250px]">
    <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
    <input
      v-model="searchTerm"
      @input="updateFilters"
      type="text"
      placeholder="Search by document, customer, or code..."
      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
    />
  </div>
  <div class="flex-1 min-w-[150px]">
    <label class="block text-xs font-medium text-gray-700 mb-1">Type</label>
    <select ... />
  </div>
  <div class="flex-1 min-w-[150px]">
    <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
    <select ... />
  </div>
  <div class="flex-shrink-0">
    <button v-if="hasActiveFilters" @click="clearFilters">Clear Filters</button>
  </div>
</div>
```

### Table Header
```vue
<thead class="bg-gray-50 sticky top-0 z-10">
```

### Clickable Row
```vue
<tr
  v-for="item in items"
  :key="item.id"
  class="hover:bg-gray-50 cursor-pointer transition-colors"
  @click="viewItem(item)"
>
```

### Icon Action Buttons
```vue
<td @click.stop>
  <div class="flex space-x-2">
    <button
      @click.stop="viewItem(item)"
      class="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
      title="View"
    >
      <!-- Eye icon SVG -->
    </button>
    <!-- Similar for Edit and Delete -->
  </div>
</td>
```

## Notes
- Each view may have slightly different filter options - adapt as needed
- Keep module-specific filters if they're essential
- Maintain consistency in styling and behavior
- Test each view after updates

