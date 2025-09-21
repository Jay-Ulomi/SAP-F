<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Invoice</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label for="postingDate" class="block text-sm font-medium text-gray-700 mb-1">
            Posting Date *
          </label>
          <input
            id="postingDate"
            v-model="formData.postingDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="invoiceDate" class="block text-sm font-medium text-gray-700 mb-1">
            Document Date *
          </label>
          <input
            id="invoiceDate"
            v-model="formData.invoiceDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="dueDate" class="block text-sm font-medium text-gray-700 mb-1">
            Due Date *
          </label>
          <input
            id="dueDate"
            v-model="formData.dueDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="customerCode" class="block text-sm font-medium text-gray-700 mb-1">
            Customer Code *
          </label>
          <input
            id="customerCode"
            v-model="formData.customerCode"
            type="text"
            required
            placeholder="Enter customer code"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="customerName" class="block text-sm font-medium text-gray-700 mb-1">
            Customer Name
          </label>
          <input
            id="customerName"
            v-model="formData.customerName"
            type="text"
            placeholder="Enter customer name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="contactPerson" class="block text-sm font-medium text-gray-700 mb-1">
            Contact Person
          </label>
          <input
            id="contactPerson"
            v-model="formData.contactPerson"
            type="text"
            placeholder="Enter contact person"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="referenceNo" class="block text-sm font-medium text-gray-700 mb-1">
            Reference No.
          </label>
          <input
            id="referenceNo"
            v-model="formData.reference"
            type="text"
            placeholder="Enter reference number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="salesEmployee" class="block text-sm font-medium text-gray-700 mb-1">
            Sales Employee
          </label>
          <input
            id="salesEmployee"
            v-model="formData.salesPerson"
            type="text"
            placeholder="Enter sales employee"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
            Currency
          </label>
          <input
            id="currency"
            v-model="formData.currency"
            type="text"
            placeholder="Enter currency"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <!-- Remarks -->
        <div class="col-span-full mt-4">
          <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            id="remarks"
            v-model="formData.remarks"
            rows="2"
            placeholder="Enter remarks (max 254 characters)"
            maxlength="254"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <h3 class="text-base font-medium text-gray-900">Line Items</h3>
          <div class="flex items-center space-x-2">
            <label for="arInvoiceType" class="text-sm font-medium text-gray-700">
              Type:
            </label>
            <select
              id="arInvoiceType"
              v-model="formData.type"
              class="text-sm border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-400 text-gray-900"
            >
              <option value="Item">Item</option>
              <option value="Service">Service</option>
            </select>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            type="button"
            @click="handleImportExcel"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            Import Excel
          </button>
          <button
            type="button"
            @click="handleSampleExcel"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Sample Excel
          </button>
          <button
            type="button"
            @click="handleCopyFrom"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
            </svg>
            Copy From
          </button>
        </div>
      </div>

      <div v-if="formData.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items added yet. Click "Add Line" to add items to this invoice.
      </div>

      <div v-else class="w-full overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <!-- Item Type Headers -->
          <thead v-if="formData.type === 'Item'" class="bg-gray-50">
            <tr>
              <th class="min-w-[100px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50">
                Item No.
              </th>
              <th class="min-w-[150px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Qty
              </th>
              <th class="min-w-[100px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Disc%
              </th>
              <th class="min-w-[100px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Tax
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim1
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim2
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim3
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim4
              </th>
              <th class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                WH
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Project
              </th>
              <th class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky right-0 bg-gray-50">
              </th>
            </tr>
          </thead>

          <!-- Service Type Headers -->
          <thead v-else class="bg-gray-50">
            <tr>
              <th class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50">
                Sno.
              </th>
              <th class="min-w-[200px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Discount
              </th>
              <th class="min-w-[120px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Total (LC)
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Tax Code
              </th>
              <th class="min-w-[120px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Tax Amount
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim1
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Dim2
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim3
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell">
                Dim4
              </th>
              <th class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                Warehouse
              </th>
              <th class="min-w-[120px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Project
              </th>
              <th class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky right-0 bg-gray-50">
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Item Type Rows -->
            <template v-if="formData.type === 'Item'">
            <tr v-for="(item, index) in formData.lineItems" :key="`item-${index}`">
              <td class="min-w-[100px] px-2 py-1 sticky left-0 bg-white">
                <input
                  v-model="item.itemCode"
                  type="text"
                  placeholder="Code"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[150px] px-2 py-1">
                <textarea
                  v-model="item.description"
                  placeholder="Description"
                  rows="2"
                  class="w-full min-w-[140px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
                  @input="handleLineItemInput(index)"
                ></textarea>
              </td>
              <td class="min-w-[80px] px-2 py-1">
                <input
                  v-model.number="item.quantity"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1">
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[80px] px-2 py-1">
                <input
                  v-model.number="item.discount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1">
                <span class="text-xs text-gray-900">{{ formatCurrency((item.quantity || 0) * (item.unitPrice || 0) - (item.discount || 0)) }}</span>
              </td>
              <td class="min-w-[80px] px-2 py-1">
                <select
                  v-model="item.taxCode"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                >
                  <option value="">-</option>
                  <option v-for="tax in taxCodes" :key="tax.code" :value="tax.code">{{ tax.code }}</option>
                </select>
              </td>
              <td class="min-w-[80px] px-2 py-1 hidden lg:table-cell">
                <input
                  v-model="item.dimension1"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[80px] px-2 py-1 hidden lg:table-cell">
                <input
                  v-model="item.dimension2"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[80px] px-2 py-1 hidden xl:table-cell">
                <input
                  v-model="item.dimension3"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[80px] px-2 py-1 hidden xl:table-cell">
                <input
                  v-model="item.dimension4"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[80px] px-2 py-1 hidden md:table-cell">
                <input
                  v-model="item.warehouseCode"
                  type="text"
                  placeholder="WH"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1 hidden lg:table-cell">
                <input
                  v-model="item.project"
                  type="text"
                  placeholder="Project"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="min-w-[60px] px-2 py-1 sticky right-0 bg-white">
                <button
                  v-if="formData.lineItems.length > 5"
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-800 text-xs"
                >
                  ×
                </button>
              </td>
            </tr>
            </template>

            <!-- Service Type Rows -->
            <template v-else>
            <tr v-for="(service, index) in formData.serviceItems" :key="`service-${index}`">
              <td class="min-w-[60px] px-2 py-1 text-center text-xs text-gray-900 sticky left-0 bg-white">
                {{ service.sno }}
              </td>
              <td class="min-w-[200px] px-2 py-1">
                <textarea
                  v-model="service.description"
                  placeholder="Description"
                  rows="2"
                  class="w-full min-w-[180px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
                  @input="handleServiceItemInput(index)"
                ></textarea>
              </td>
              <td class="min-w-[100px] px-2 py-1">
                <input
                  v-model.number="service.discount"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[120px] px-2 py-1">
                <input
                  v-model.number="service.total"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1">
                <select
                  v-model="service.taxCode"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="handleServiceItemInput(index)"
                >
                  <option value="OEXEMPT">OEXEMPT</option>
                  <option value="OVAT-18">OVAT-18</option>
                  <option value="OVAT-0">OVAT-0</option>
                </select>
              </td>
              <td class="min-w-[120px] px-2 py-1 text-right text-xs text-gray-900">
                {{ formatCurrency(service.taxAmount || 0) }}
              </td>
              <td class="min-w-[100px] px-2 py-1 hidden lg:table-cell">
                <input
                  v-model="service.dimension1"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1 hidden lg:table-cell">
                <input
                  v-model="service.dimension2"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1 hidden xl:table-cell">
                <input
                  v-model="service.dimension3"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1 hidden xl:table-cell">
                <input
                  v-model="service.dimension4"
                  type="text"
                  placeholder="Dim"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[100px] px-2 py-1 hidden md:table-cell">
                <input
                  v-model="service.warehouse"
                  type="text"
                  placeholder="WH"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[120px] px-2 py-1 hidden lg:table-cell">
                <input
                  v-model="service.project"
                  type="text"
                  placeholder="Project"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleServiceItemInput(index)"
                />
              </td>
              <td class="min-w-[60px] px-2 py-1 text-center sticky right-0 bg-white">
                <button
                  v-if="formData.serviceItems.length > 5"
                  type="button"
                  @click="removeServiceItem(index)"
                  class="text-red-600 hover:text-red-800 text-xs w-6 h-6 rounded flex items-center justify-center"
                >
                  ×
                </button>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Totals Summary -->
      <div v-if="(formData.type === 'Item' && formData.lineItems.length > 0) || (formData.type === 'Service' && formData.serviceItems.length > 0)" class="mt-6 border-t pt-4">
        <div class="flex justify-end">
          <div class="w-80 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Total Before Discount:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Discount:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(totalDiscount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Freight Type:</span>
              <select v-model="formData.freightType" class="w-32 text-sm border-gray-300 rounded-md text-gray-900 focus:border-gray-400 focus:ring-gray-400">
                <option value="Air Freight">Air Freight</option>
                <option value="Sea Freight">Sea Freight</option>
                <option value="Land Freight">Land Freight</option>
              </select>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Freight:</span>
              <input
                v-model.number="formData.freightAmount"
                type="number"
                step="0.01"
                min="0"
                class="w-32 text-sm border-gray-300 rounded-md text-gray-900 focus:border-gray-400 focus:ring-gray-400"
                placeholder="0.00"
              />
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Tax:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(totalTax) }}</span>
            </div>
            <div class="flex justify-between text-base font-bold border-t pt-2">
              <span class="text-gray-900">Total:</span>
              <span class="text-gray-900">{{ formatCurrency(total + (formData.freightAmount || 0)) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Saving...
        </span>
        <span v-else>Save Invoice</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useArInvoicesStore } from '../stores/arInvoicesStore'
import type { ArInvoice, ArInvoiceFormData, InvoiceLineItem } from '../types'
import { InvoiceType, PaymentTerms, Currency } from '../types'

interface Props {
  initialData?: ArInvoice
  isEditing?: boolean
}

interface Emits {
  (e: 'saved', data: ArInvoice): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

const emit = defineEmits<Emits>()

// Store
const store = useArInvoicesStore()

// Form Data
const formData = ref<ArInvoiceFormData>({
  customerCode: '',
  customerName: '',
  contactPerson: '',
  invoiceDate: '',
  dueDate: '',
  postingDate: '',
  currency: 'USD',
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  freightType: 'Air Freight',
  freightAmount: 0,
  type: 'Item', // Line item type
  lineItems: [],
  serviceItems: [],
})

// Supporting Data
const customers = computed(() => store.customers)
const taxCodes = computed(() => store.taxCodes)

// Button handlers
const handleImportExcel = () => {
  console.log('Import Excel clicked')
}

const handleSampleExcel = () => {
  console.log('Sample Excel clicked')
}

const handleCopyFrom = () => {
  console.log('Copy From clicked')
}

// Line item handling functions
const hasLineItemData = (item: any): boolean => {
  return item.itemCode?.trim() !== '' ||
         item.description?.trim() !== '' ||
         (item.quantity && item.quantity > 0) ||
         (item.unitPrice && item.unitPrice > 0) ||
         (item.discount && item.discount > 0) ||
         item.dimension1?.trim() !== '' ||
         item.dimension2?.trim() !== '' ||
         item.dimension3?.trim() !== '' ||
         item.dimension4?.trim() !== '' ||
         item.warehouseCode?.trim() !== '' ||
         item.project?.trim() !== ''
}

const hasServiceItemData = (service: any): boolean => {
  return service.description?.trim() !== '' ||
         (service.discount && service.discount > 0) ||
         (service.total && service.total > 0) ||
         service.taxCode?.trim() !== '' ||
         service.dimension1?.trim() !== '' ||
         service.dimension2?.trim() !== '' ||
         service.dimension3?.trim() !== '' ||
         service.dimension4?.trim() !== '' ||
         service.warehouse?.trim() !== '' ||
         service.project?.trim() !== ''
}

const handleLineItemInput = (index: number) => {
  const item = formData.value.lineItems[index]

  // If this is the last row and it has data, add a new empty row
  if (index === formData.value.lineItems.length - 1 && hasLineItemData(item)) {
    addLineItem()
  }

  // Ensure we always have at least 5 rows
  while (formData.value.lineItems.length < 5) {
    addLineItem()
  }
}

// Constants
const invoiceTypes = Object.values(InvoiceType)
const paymentTerms = Object.values(PaymentTerms)
const currencies = Object.values(Currency)

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        customerCode: newData.customerCode,
        invoiceDate: newData.invoiceDate,
        dueDate: newData.dueDate,
        postingDate: newData.postingDate,
        type: newData.type,
        currency: newData.currency,
        exchangeRate: newData.exchangeRate,
        paymentTerms: newData.paymentTerms,
        salesPerson: newData.salesPerson || '',
        reference: newData.reference || '',
        remarks: newData.remarks || '',
        project: newData.project || '',
        lineItems: newData.lineItems.map((item) => ({
          itemCode: item.itemCode,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discount: item.discount,
          discountType: item.discountType,
          taxCode: item.taxCode,
          taxRate: item.taxRate,
        })),
      }
    }
  },
  { immediate: true },
)

// Set default dates
onMounted(() => {
  if (!props.initialData) {
    const today = new Date()
    const dueDate = new Date(today)
    dueDate.setDate(today.getDate() + 30)

    formData.value.invoiceDate = today.toISOString().split('T')[0]
    formData.value.dueDate = dueDate.toISOString().split('T')[0]
    formData.value.postingDate = today.toISOString().split('T')[0]

    // Add 5 default line items
    for (let i = 0; i < 5; i++) {
      addLineItem()
    }
    // Add 5 default service items
    for (let i = 0; i < 5; i++) {
      addServiceItem()
    }
  }

  // Load supporting data
  store.loadCustomers({ limit: 100 })
  store.loadTaxCodes()
})

// Line Items Management
const addLineItem = () => {
  formData.value.lineItems.push({
    itemCode: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    discountType: 'PERCENTAGE',
    taxCode: '',
    taxRate: 0,
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    warehouseCode: '',
    project: '',
    sno: (formData.value.lineItems.length + 1).toString(),
  })
}

const removeLineItem = (index: number) => {
  // Only allow removal if we have more than 5 rows
  if (formData.value.lineItems.length > 5) {
    formData.value.lineItems.splice(index, 1)
  }
}

const handleServiceItemInput = (index: number) => {
  const service = formData.value.serviceItems[index]
  // If this is the last row and it has data, add a new empty row
  if (index === formData.value.serviceItems.length - 1 && hasServiceItemData(service)) {
    addServiceItem()
  }
  // Ensure we always have at least 5 rows
  while (formData.value.serviceItems.length < 5) {
    addServiceItem()
  }
}

const addServiceItem = () => {
  const nextSno = formData.value.serviceItems.length + 1
  formData.value.serviceItems.push({
    sno: nextSno,
    description: '',
    discount: 0,
    total: 0,
    taxCode: 'OEXEMPT',
    taxAmount: 0,
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    warehouse: '',
    project: ''
  })
}

const removeServiceItem = (index: number) => {
  // Only allow removal if we have more than 5 rows
  if (formData.value.serviceItems.length > 5) {
    formData.value.serviceItems.splice(index, 1)
    // Recalculate serial numbers
    formData.value.serviceItems.forEach((item, idx) => {
      item.sno = idx + 1
    })
  }
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = taxCodes.value.find((tax) => tax.code === item.taxCode)
  if (taxCode) {
    item.taxRate = taxCode.rate
  } else {
    item.taxRate = 0
  }
  calculateLineTotal(index)
}

const calculateLineTotal = (index: number) => {
  // Trigger reactivity by updating the line item
  const item = formData.value.lineItems[index]
  formData.value.lineItems[index] = { ...item }
}

const getLineTotal = (item: InvoiceLineItem): number => {
  const subtotal = item.quantity * item.unitPrice
  let discountAmount = 0

  if (item.discountType === 'PERCENTAGE') {
    discountAmount = subtotal * (item.discount / 100)
  } else {
    discountAmount = item.discount
  }

  const afterDiscount = subtotal - discountAmount
  const taxAmount = afterDiscount * (item.taxRate / 100)

  return afterDiscount + taxAmount
}

// Calculations
const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

const totalDiscount = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice
    if (item.discountType === 'PERCENTAGE') {
      return sum + itemSubtotal * (item.discount / 100)
    } else {
      return sum + item.discount
    }
  }, 0)
})

const totalTax = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice
    let discountAmount = 0

    if (item.discountType === 'PERCENTAGE') {
      discountAmount = itemSubtotal * (item.discount / 100)
    } else {
      discountAmount = item.discount
    }

    const afterDiscount = itemSubtotal - discountAmount
    return sum + afterDiscount * (item.taxRate / 100)
  }, 0)
})

const total = computed(() => {
  return subtotal.value - totalDiscount.value + totalTax.value
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.customerCode &&
    formData.value.invoiceDate &&
    formData.value.dueDate &&
    formData.value.postingDate &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every(
      (item) => item.itemCode && item.description && item.quantity > 0 && item.unitPrice >= 0,
    )
  )
})

// Form Submission
const handleSubmit = async () => {
  if (!isFormValid.value) return

  try {
    let result
    if (props.isEditing && props.initialData?.id) {
      result = await store.updateInvoice(props.initialData.id, formData.value)
    } else {
      result = await store.createInvoice(formData.value)
    }

    emit('saved', result)
  } catch (error) {
    console.error('Error saving invoice:', error)
  }
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const formatInvoiceType = (type: InvoiceType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPaymentTerms = (terms: PaymentTerms): string => {
  return terms.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
