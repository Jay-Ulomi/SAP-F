<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Quotation</h3>

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
            :class="{ 'border-red-500': errors.postingDate }"
          />
          <p v-if="errors.postingDate" class="mt-1 text-sm text-red-600">
            {{ errors.postingDate }}
          </p>
        </div>

        <div>
          <label for="validTill" class="block text-sm font-medium text-gray-700 mb-1">
            Valid Till *
          </label>
          <input
            id="validTill"
            v-model="formData.validUntil"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
            :class="{ 'border-red-500': errors.validUntil }"
          />
          <p v-if="errors.validUntil" class="mt-1 text-sm text-red-600">{{ errors.validUntil }}</p>
        </div>

        <div>
          <label for="documentDate" class="block text-sm font-medium text-gray-700 mb-1">
            Document Date *
          </label>
          <input
            id="documentDate"
            v-model="formData.quotationDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
            :class="{ 'border-red-500': errors.quotationDate }"
          />
          <p v-if="errors.quotationDate" class="mt-1 text-sm text-red-600">
            {{ errors.quotationDate }}
          </p>
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
            :class="{ 'border-red-500': errors.customerCode }"
          />
          <p v-if="errors.customerCode" class="mt-1 text-sm text-red-600">
            {{ errors.customerCode }}
          </p>
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
          <h4 class="text-lg font-medium text-gray-900">Line Items</h4>
          <div class="flex items-center space-x-2">
            <label for="quotationType" class="text-sm font-medium text-gray-700"> Type: </label>
            <select
              id="quotationType"
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
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            Import Excel
          </button>
          <button
            type="button"
            @click="handleSampleExcel"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Sample Excel
          </button>
          <button
            type="button"
            @click="handleCopyFrom"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              ></path>
            </svg>
            Copy From
          </button>
        </div>
      </div>

      <div class="w-full overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <!-- Item Type Headers -->
          <thead v-if="formData.type === 'Item'" class="bg-gray-50">
            <tr>
              <th
                class="min-w-[100px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50"
              >
                Item No.
              </th>
              <th
                class="min-w-[150px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Description
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Qty
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                UoM
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Price
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Disc%
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Total
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Tax
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Tax Amt
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
              >
                Dim1
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
              >
                Dim2
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell"
              >
                Dim3
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell"
              >
                Dim4
              </th>
              <th
                class="min-w-[80px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell"
              >
                WH
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
              >
                Project
              </th>
              <th
                class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky right-0 bg-gray-50"
              ></th>
            </tr>
          </thead>
          <!-- Service Type Headers -->
          <thead v-else class="bg-gray-50">
            <tr>
              <th
                class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50"
              >
                Sno.
              </th>
              <th
                class="min-w-[200px] px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase"
              >
                Description
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Discount
              </th>
              <th
                class="min-w-[120px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Total (LC)
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase"
              >
                Tax Code
              </th>
              <th
                class="min-w-[120px] px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase"
              >
                Tax Amount
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
              >
                Dim1
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
              >
                Dim2
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell"
              >
                Dim3
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden xl:table-cell"
              >
                Dim4
              </th>
              <th
                class="min-w-[100px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden md:table-cell"
              >
                WH
              </th>
              <th
                class="min-w-[120px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase hidden lg:table-cell"
              >
                Project
              </th>
              <th
                class="min-w-[60px] px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase sticky right-0 bg-gray-50"
              ></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Item Type Rows -->
            <template v-if="formData.type === 'Item'">
              <tr v-for="(item, index) in formData.lineItems" :key="index">
                <td class="px-2 py-1 sticky left-0 bg-white">
                  <input
                    v-model="item.itemCode"
                    type="text"
                    placeholder="Code"
                    class="w-full min-w-[90px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleLineItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <textarea
                    v-model="item.description"
                    placeholder="Description"
                    rows="2"
                    class="w-full min-w-[140px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
                    @input="handleLineItemInput(index)"
                  ></textarea>
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model.number="item.quantity"
                    type="number"
                    step="1"
                    min="0"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                    @input="(calculateLineTotal(index), handleLineItemInput(index))"
                  />
                </td>
                <td class="px-2 py-1">
                  <select
                    v-model="item.uom"
                    class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                    @change="handleLineItemInput(index)"
                  >
                    <option value="pcs">pcs</option>
                    <option value="kg">kg</option>
                    <option value="m">m</option>
                    <option value="ltr">ltr</option>
                  </select>
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model.number="item.unitPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                    @input="(calculateLineTotal(index), handleLineItemInput(index))"
                  />
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model.number="item.discount"
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    placeholder="0"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="(calculateLineTotal(index), handleLineItemInput(index))"
                  />
                </td>
                <td class="px-2 py-1 text-right text-xs font-medium text-gray-900">
                  {{ formatCurrency(getLineSubtotal(item)) }}
                </td>
                <td class="px-2 py-1">
                  <select
                    v-model="item.taxCode"
                    class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                    @change="(updateTaxRate(index), handleLineItemInput(index))"
                  >
                    <option value="OEXEMPT">EX</option>
                    <option value="OVAT-18">18</option>
                    <option value="OVAT-0">0</option>
                  </select>
                </td>
                <td class="px-2 py-1 text-right text-xs text-gray-900">
                  {{ formatCurrency(getLineTax(item)) }}
                </td>
                <td class="px-2 py-1 hidden lg:table-cell">
                  <input
                    v-model="item.dimension1"
                    type="text"
                    placeholder="Dim"
                    class="w-full min-w-[70px] text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleLineItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1 hidden lg:table-cell">
                  <input
                    v-model="item.dimension2"
                    type="text"
                    placeholder="Dim"
                    class="w-full min-w-[70px] text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleLineItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1 hidden xl:table-cell">
                  <input
                    v-model="item.dimension3"
                    type="text"
                    placeholder="Dim"
                    class="w-full min-w-[70px] text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleLineItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1 hidden xl:table-cell">
                  <input
                    v-model="item.dimension4"
                    type="text"
                    placeholder="Dim"
                    class="w-full min-w-[70px] text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleLineItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1 hidden md:table-cell">
                  <input
                    v-model="item.warehouse"
                    type="text"
                    placeholder="WH"
                    class="w-full min-w-[70px] text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleLineItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1 hidden lg:table-cell">
                  <input
                    v-model="item.project"
                    type="text"
                    placeholder="Project"
                    class="w-full min-w-[90px] text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleLineItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1 text-center sticky right-0 bg-white">
                  <button
                    v-if="
                      formData.lineItems.length > 5 ||
                      (formData.lineItems.length > 1 && hasLineItemData(item))
                    "
                    type="button"
                    @click="removeLineItem(index)"
                    class="text-red-600 hover:text-red-800 text-xs w-6 h-6 rounded flex items-center justify-center p-1"
                  >
                    ×
                  </button>
                </td>
              </tr>
            </template>
            <!-- Service Type Rows -->
            <template v-else>
              <tr v-for="(service, index) in formData.serviceItems" :key="'service-' + index">
                <td class="px-2 py-1 text-center text-xs text-gray-900 sticky left-0 bg-white">
                  {{ service.sno }}
                </td>
                <td class="px-2 py-1">
                  <textarea
                    v-model="service.description"
                    placeholder="Description"
                    rows="2"
                    class="w-full min-w-[180px] text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700 resize-none"
                    @input="handleServiceItemInput(index)"
                  ></textarea>
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model.number="service.discount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model.number="service.total"
                    type="number"
                    step="0.01"
                    min="0"
                    class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <select
                    v-model="service.taxCode"
                    class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                    @change="handleServiceItemInput(index)"
                  >
                    <option value="OEXEMPT">EX</option>
                    <option value="OVAT-18">18</option>
                    <option value="OVAT-0">0</option>
                  </select>
                </td>
                <td class="px-2 py-1 text-right text-xs text-gray-900">
                  {{ formatCurrency(service.taxAmount) }}
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model="service.dimension1"
                    type="text"
                    placeholder="Dim"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model="service.dimension2"
                    type="text"
                    placeholder="Dim"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model="service.dimension3"
                    type="text"
                    placeholder="Dim"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model="service.dimension4"
                    type="text"
                    placeholder="Dim"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model="service.warehouse"
                    type="text"
                    placeholder="WH"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1">
                  <input
                    v-model="service.project"
                    type="text"
                    placeholder="Project"
                    class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                    @input="handleServiceItemInput(index)"
                  />
                </td>
                <td class="px-2 py-1 text-center sticky right-0 bg-white">
                  <button
                    v-if="
                      formData.serviceItems.length > 3 ||
                      (formData.serviceItems.length > 1 && hasServiceItemData(service))
                    "
                    type="button"
                    @click="removeServiceItem(index)"
                    class="text-red-600 hover:text-red-800 text-xs w-6 h-6 rounded flex items-center justify-center p-1"
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
      <div
        v-if="
          (formData.type === 'Item' && formData.lineItems.length > 0) ||
          (formData.type === 'Service' && formData.serviceItems.length > 0)
        "
        class="mt-6 border-t pt-4"
      >
        <div class="flex justify-end">
          <div class="w-80 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Total Before Discount:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Discount:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(discountTotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Freight Type:</span>
              <select
                v-model="formData.freightType"
                class="w-32 text-sm border-gray-300 rounded-md text-gray-900 focus:border-gray-400 focus:ring-gray-400"
              >
                <option value="Air Freight">Air Freight</option>
                <option value="Sea Freight">Sea Freight</option>
                <option value="Road">Road</option>
              </select>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Freight Amount:</span>
              <input
                v-model.number="formData.freightAmount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                class="w-32 text-sm text-right border-gray-300 rounded-md text-gray-900 placeholder-gray-700 focus:border-gray-400 focus:ring-gray-400"
              />
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-900">Tax:</span>
              <span class="font-medium text-gray-900">{{ formatCurrency(taxTotal) }}</span>
            </div>
            <div class="flex justify-between text-base font-bold border-t pt-2">
              <span class="text-gray-900">Total:</span>
              <span class="text-gray-900">{{
                formatCurrency(totalAmount + (formData.freightAmount || 0))
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('close')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
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
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {{ isEditing ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>{{ isEditing ? 'Update Quotation' : 'Create Quotation' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useQuotationsStore } from '../stores/quotationsStore'
import type { Quotation } from '../types'

// Service Item type
interface ServiceItem {
  sno: number
  description: string
  discount: number
  total: number
  taxCode: string
  taxAmount: number
  dimension1: string
  dimension2: string
  dimension3: string
  dimension4: string
  warehouse: string
  project: string
}

// Default service items
const defaultServiceItems: ServiceItem[] = [
  {
    sno: 1,
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
    project: '',
  },
  {
    sno: 2,
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
    project: '',
  },
  {
    sno: 3,
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
    project: '',
  },
]

const createEmptyServiceItem = (sno: number): ServiceItem => ({
  sno,
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
  project: '',
})

// Props
interface Props {
  quotation?: Quotation | null
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  quotation: null,
  isEditing: false,
})

// Emits
const emit = defineEmits<{
  close: []
  saved: [Quotation]
}>()

// Store
const quotationsStore = useQuotationsStore()

// Form Data
const formData = ref<any>({
  customerCode: '',
  customerName: '',
  contactPerson: '',
  quotationDate: '',
  validUntil: '',
  postingDate: '',
  type: 'Item',
  currency: 'USD',
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  relatedOpportunityId: '',
  freightType: 'Air Freight',
  freightAmount: 0,
  serviceItems: [...defaultServiceItems],
  lineItems: [
    {
      itemCode: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      discountType: 'PERCENTAGE',
      taxCode: 'OEXEMPT',
      taxRate: 0,
      uom: 'pcs',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
      project: '',
      remarks: '',
    },
    {
      itemCode: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      discountType: 'PERCENTAGE',
      taxCode: 'OEXEMPT',
      taxRate: 0,
      uom: 'pcs',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
      project: '',
      remarks: '',
    },
    {
      itemCode: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      discountType: 'PERCENTAGE',
      taxCode: 'OEXEMPT',
      taxRate: 0,
      uom: 'pcs',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
      project: '',
      remarks: '',
    },
    {
      itemCode: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      discountType: 'PERCENTAGE',
      taxCode: 'OEXEMPT',
      taxRate: 0,
      uom: 'pcs',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
      project: '',
      remarks: '',
    },
    {
      itemCode: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      discountType: 'PERCENTAGE',
      taxCode: 'OEXEMPT',
      taxRate: 0,
      uom: 'pcs',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
      project: '',
      remarks: '',
    },
  ],
})

// Local State
const loading = ref(false)
const errors = ref<Record<string, string>>({})

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

// Computed Properties
const taxCodes = computed(() => quotationsStore.taxCodes)

const subtotal = computed(() => {
  if (formData.value.type === 'Item') {
    return formData.value.lineItems.reduce((sum: number, item: any) => {
      return sum + item.quantity * item.unitPrice
    }, 0)
  } else {
    return formData.value.serviceItems.reduce((sum: number, service: ServiceItem) => {
      return sum + service.total
    }, 0)
  }
})

const discountTotal = computed(() => {
  if (formData.value.type === 'Item') {
    return formData.value.lineItems.reduce((sum: number, item: any) => {
      return sum + item.quantity * item.unitPrice * (item.discount / 100)
    }, 0)
  } else {
    return formData.value.serviceItems.reduce((sum: number, service: ServiceItem) => {
      return sum + service.discount
    }, 0)
  }
})

const taxTotal = computed(() => {
  if (formData.value.type === 'Item') {
    return formData.value.lineItems.reduce((sum: number, item: any) => {
      const lineSubtotal = item.quantity * item.unitPrice
      const lineDiscount = lineSubtotal * (item.discount / 100)
      const taxableAmount = lineSubtotal - lineDiscount
      return sum + taxableAmount * (item.taxRate / 100)
    }, 0)
  } else {
    return formData.value.serviceItems.reduce((sum: number, service: ServiceItem) => {
      return sum + service.taxAmount
    }, 0)
  }
})

const totalAmount = computed(() => {
  return subtotal.value - discountTotal.value + taxTotal.value
})

// Customer and item search functions removed - now using simple form controls

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = taxCodes.value.find((tc) => tc.code === item.taxCode)
  if (taxCode) {
    item.taxRate = taxCode.rate
    calculateLineTotal(index)
  }
}

const calculateLineTotal = (index: number) => {
  // Trigger recalculation of computed properties
  // The actual calculation happens in the computed properties
}

const getLineSubtotal = (item: any): number => {
  const lineSubtotal = item.quantity * item.unitPrice
  const lineDiscount = lineSubtotal * (item.discount / 100)
  return lineSubtotal - lineDiscount
}

const getLineTax = (item: any): number => {
  const lineSubtotal = item.quantity * item.unitPrice
  const lineDiscount = lineSubtotal * (item.discount / 100)
  const taxableAmount = lineSubtotal - lineDiscount
  return taxableAmount * (item.taxRate / 100)
}

const hasLineItemData = (item: any): boolean => {
  return (
    item.itemCode.trim() !== '' ||
    item.description.trim() !== '' ||
    item.quantity > 0 ||
    item.unitPrice > 0 ||
    item.discount > 0 ||
    item.dimension1.trim() !== '' ||
    item.dimension2.trim() !== '' ||
    item.dimension3.trim() !== '' ||
    item.dimension4.trim() !== '' ||
    item.warehouse.trim() !== '' ||
    item.project.trim() !== ''
  )
}

const handleLineItemInput = (index: number) => {
  const item = formData.value.lineItems[index]

  // If this is the last row and it has data, add a new empty row
  if (index === formData.value.lineItems.length - 1 && hasLineItemData(item)) {
    addLineItem()
  }
}

const hasServiceItemData = (service: ServiceItem): boolean => {
  return (
    service.description.trim() !== '' ||
    service.total > 0 ||
    service.discount > 0 ||
    service.dimension1.trim() !== '' ||
    service.dimension2.trim() !== '' ||
    service.dimension3.trim() !== '' ||
    service.dimension4.trim() !== '' ||
    service.warehouse.trim() !== '' ||
    service.project.trim() !== ''
  )
}

const handleServiceItemInput = (index: number) => {
  const service = formData.value.serviceItems[index]

  // If this is the last row and it has data, add a new empty row
  if (index === formData.value.serviceItems.length - 1 && hasServiceItemData(service)) {
    addServiceItem()
  }
}

const addServiceItem = () => {
  const nextSno = formData.value.serviceItems.length + 1
  formData.value.serviceItems.push(createEmptyServiceItem(nextSno))
}

const removeServiceItem = (index: number) => {
  if (formData.value.serviceItems.length > 3) {
    formData.value.serviceItems.splice(index, 1)
    // Renumber the remaining items
    formData.value.serviceItems.forEach((item: ServiceItem, idx: number) => {
      item.sno = idx + 1
    })
  } else if (formData.value.serviceItems.length > 1) {
    // Clear the item data but keep minimum 3 rows
    formData.value.serviceItems[index] = createEmptyServiceItem(index + 1)
  }
}

const addLineItem = () => {
  formData.value.lineItems.push({
    itemCode: '',
    description: '',
    quantity: 0,
    unitPrice: 0,
    discount: 0,
    discountType: 'PERCENTAGE',
    taxCode: 'OEXEMPT',
    taxRate: 0,
    uom: 'pcs',
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    warehouse: '',
    project: '',
    remarks: '',
  })
}

const removeLineItem = (index: number) => {
  if (formData.value.lineItems.length > 1) {
    formData.value.lineItems.splice(index, 1)
  } else if (formData.value.lineItems.length > 1) {
    // Clear the item data but keep minimum 5 rows
    formData.value.lineItems[index] = {
      itemCode: '',
      description: '',
      quantity: 0,
      unitPrice: 0,
      discount: 0,
      discountType: 'PERCENTAGE',
      taxCode: 'OEXEMPT',
      taxRate: 0,
      uom: 'pcs',
      dimension1: '',
      dimension2: '',
      dimension3: '',
      dimension4: '',
      warehouse: '',
      project: '',
      remarks: '',
    }
  }
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.customerCode) {
    errors.value.customerCode = 'Customer code is required'
  }

  if (!formData.value.quotationDate) {
    errors.value.quotationDate = 'Document date is required'
  }

  if (!formData.value.validUntil) {
    errors.value.validUntil = 'Valid till date is required'
  }

  if (!formData.value.postingDate) {
    errors.value.postingDate = 'Posting date is required'
  }

  // Validate based on type
  if (formData.value.type === 'Item') {
    // Validate line items
    formData.value.lineItems.forEach((item: any, index: number) => {
      if (!item.itemCode) {
        errors.value[`lineItems.${index}.itemCode`] = 'Item code is required'
      }
      if (!item.description) {
        errors.value[`lineItems.${index}.description`] = 'Description is required'
      }
      if (item.quantity <= 0) {
        errors.value[`lineItems.${index}.quantity`] = 'Quantity must be greater than 0'
      }
      if (item.unitPrice < 0) {
        errors.value[`lineItems.${index}.unitPrice`] = 'Unit price cannot be negative'
      }
    })
  } else {
    // Validate service items
    formData.value.serviceItems.forEach((service: ServiceItem, index: number) => {
      if (!service.description.trim()) {
        errors.value[`serviceItems.${index}.description`] = 'Description is required'
      }
      if (service.total < 0) {
        errors.value[`serviceItems.${index}.total`] = 'Total cannot be negative'
      }
    })
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    let result: any
    if (props.isEditing && props.quotation) {
      result = await quotationsStore.updateQuotation(props.quotation.id, formData.value)
    } else {
      result = await quotationsStore.createQuotation(formData.value)
    }

    if (result.success && result.data) {
      emit('saved', result.data)
    }
  } catch (error) {
    console.error('Error saving quotation:', error)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number | string | null | undefined): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : Number(amount)
  if (!isFinite(numericAmount)) {
    return '—'
  }

  const currencyCode = (formData.value.currency && String(formData.value.currency).trim()) || 'USD'
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(numericAmount)
  } catch (_err) {
    return `${currencyCode} ${numericAmount.toFixed(2)}`
  }
}

// Watch for quotation type changes
watch(
  () => formData.value.type,
  (newType) => {
    if (newType === 'Service' && formData.value.serviceItems.length === 0) {
      formData.value.serviceItems = [...defaultServiceItems]
    }
  },
)

// Initialize form data when editing
watch(
  () => props.quotation,
  (newQuotation) => {
    if (newQuotation && props.isEditing) {
      formData.value = {
        customerCode: newQuotation.customerCode,
        customerName: (newQuotation as any).customerName || '',
        contactPerson: (newQuotation as any).contactPerson || '',
        quotationDate: newQuotation.quotationDate,
        validUntil: newQuotation.validUntil,
        postingDate: newQuotation.postingDate,
        type: 'Item',
        currency: newQuotation.currency || 'USD',
        exchangeRate: newQuotation.exchangeRate || 1,
        salesPerson: newQuotation.salesPerson || '',
        reference: newQuotation.reference || '',
        remarks: newQuotation.remarks || '',
        project: newQuotation.project || '',
        relatedOpportunityId: newQuotation.relatedOpportunityId || '',
        freightType: (newQuotation as any).freightType || 'Air Freight',
        freightAmount: (newQuotation as any).freightAmount || 0,
        serviceItems: (newQuotation as any).serviceItems || [...defaultServiceItems],
        lineItems: newQuotation.lineItems.map((item) => ({
          itemCode: item.itemCode,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discount: item.discount,
          discountType: item.discountType || 'PERCENTAGE',
          taxCode: item.taxCode || 'OEXEMPT',
          taxRate: item.taxRate || 0,
          uom: (item as any).uom || 'pcs',
          dimension: (item as any).dimension || '',
          warehouse: (item as any).warehouse || '',
          remarks: item.remarks || '',
        })),
      }

      // Form data initialized for editing
    }
  },
  { immediate: true },
)

// Lifecycle
onMounted(async () => {
  await quotationsStore.fetchTaxCodes()
})
</script>
