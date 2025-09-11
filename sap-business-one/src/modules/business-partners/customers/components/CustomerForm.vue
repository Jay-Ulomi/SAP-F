<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Tabs -->
    <div class="bg-white rounded-lg shadow">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            type="button"
            class="py-2 px-1 border-b-2 font-medium text-sm"
            :class="
              activeTab === tab.id
                ? 'border-sap-blue text-sap-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Basic Information Tab -->
      <div v-if="activeTab === 'basic'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Basic Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Customer Code *</label>
            <input
              v-model="formData.customerCode"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="CUST-001"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
            <input
              v-model="formData.customerName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Customer Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              v-model="formData.companyName"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Company Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Customer Type *</label>
            <select
              v-model="formData.type"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Type</option>
              <option value="REGULAR">Regular</option>
              <option value="PREMIUM">Premium</option>
              <option value="WHOLESALE">Wholesale</option>
              <option value="RETAIL">Retail</option>
              <option value="DISTRIBUTOR">Distributor</option>
              <option value="RESELLER">Reseller</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
            <select
              v-model="formData.status"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
              <option value="PENDING_APPROVAL">Pending Approval</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              v-model="formData.industry"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Technology, Manufacturing"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              v-model="formData.website"
              type="url"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              v-model="formData.phone"
              type="tel"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="+1-555-123-4567"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              v-model="formData.email"
              type="email"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fax</label>
            <input
              v-model="formData.fax"
              type="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="+1-555-123-4568"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Additional notes about the customer"
          ></textarea>
        </div>
      </div>

      <!-- Contact Information Tab -->
      <div v-if="activeTab === 'contact'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Contact Information</h3>

        <!-- Primary Contact -->
        <div class="rounded-lg p-4 mb-6">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Primary Contact</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                v-model="primaryContact.firstName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="John"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                v-model="primaryContact.lastName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Doe"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                v-model="primaryContact.position"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Manager"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                v-model="primaryContact.email"
                type="email"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                v-model="primaryContact.phone"
                type="tel"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="+1-555-123-4567"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                v-model="primaryContact.mobile"
                type="tel"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="+1-555-987-6543"
              />
            </div>
          </div>

          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="primaryContact.notes"
              rows="2"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Additional notes about this contact"
            ></textarea>
          </div>
        </div>

        <!-- Additional Contacts -->
        <div class="flex justify-between items-center mb-3">
          <h4 class="text-sm font-medium text-gray-900">Additional Contacts</h4>
          <button
            type="button"
            @click="addContact"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add Contact
          </button>
        </div>

        <div v-if="formData.contacts.length === 0" class="text-center py-8 text-gray-500">
          No additional contacts added yet. Click "Add Contact" to add more contacts.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(contact, index) in formData.contacts"
            :key="index"
            class="rounded-lg p-4 border border-gray-200"
          >
            <div class="flex justify-between items-center mb-3">
              <h5 class="text-sm font-medium text-gray-900">Contact {{ index + 1 }}</h5>
              <button
                type="button"
                @click="removeContact(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  v-model="contact.firstName"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Jane"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  v-model="contact.lastName"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Smith"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  v-model="contact.position"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Assistant"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="contact.email"
                  type="email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="jane.smith@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  v-model="contact.phone"
                  type="tel"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="+1-555-111-2222"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                <input
                  v-model="contact.mobile"
                  type="tel"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="+1-555-333-4444"
                />
              </div>
            </div>

            <div class="mt-3">
              <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                v-model="contact.notes"
                rows="2"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Additional notes about this contact"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Addresses Tab -->
      <div v-if="activeTab === 'addresses'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Addresses</h3>

        <div class="flex justify-between items-center mb-3">
          <h4 class="text-sm font-medium text-gray-900">Customer Addresses</h4>
          <button
            type="button"
            @click="addAddress"
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add Address
          </button>
        </div>

        <div v-if="formData.addresses.length === 0" class="text-center py-8 text-gray-500">
          No addresses added yet. Click "Add Address" to add customer addresses.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(address, index) in formData.addresses"
            :key="index"
            class="rounded-lg p-4 border border-gray-200"
          >
            <div class="flex justify-between items-center mb-3">
              <h5 class="text-sm font-medium text-gray-900">Address {{ index + 1 }}</h5>
              <button
                type="button"
                @click="removeAddress(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                <select
                  v-model="address.type"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="BILLING">Billing</option>
                  <option value="SHIPPING">Shipping</option>
                  <option value="BOTH">Both</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                  v-model="address.addressLine1"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="123 Main Street"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                  v-model="address.addressLine2"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Suite 100"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  v-model="address.city"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="New York"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                <input
                  v-model="address.state"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="NY"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input
                  v-model="address.postalCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="10001"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  v-model="address.country"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="USA"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  v-model="address.phone"
                  type="tel"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="+1-555-123-4567"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="address.email"
                  type="email"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="billing@example.com"
                />
              </div>
            </div>

            <div class="mt-3">
              <label class="flex items-center">
                <input
                  v-model="address.isDefault"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <span class="ml-2 text-sm text-gray-700">Set as default address</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Financial Information Tab -->
      <div v-if="activeTab === 'financial'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Financial Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Credit Limit</label>
            <input
              v-model="formData.creditLimit"
              type="number"
              min="0"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="100000.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Balance</label>
            <input
              v-model="formData.currentBalance"
              type="number"
              min="0"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Payment Terms *</label>
            <select
              v-model="formData.paymentTerms"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Payment Terms</option>
              <option value="IMMEDIATE">Immediate</option>
              <option value="NET_15">Net 15</option>
              <option value="NET_30">Net 30</option>
              <option value="NET_45">Net 45</option>
              <option value="NET_60">Net 60</option>
              <option value="NET_90">Net 90</option>
              <option value="END_OF_MONTH">End of Month</option>
              <option value="END_OF_QUARTER">End of Quarter</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
            <select
              v-model="formData.currency"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Currency</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="AUD">AUD - Australian Dollar</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tax Exemption</label>
            <select
              v-model="formData.taxExemption"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="NONE">None</option>
              <option value="EXEMPT">Exempt</option>
              <option value="PARTIAL">Partial</option>
              <option value="RESELLER">Reseller</option>
              <option value="GOVERNMENT">Government</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tax Exemption Number</label>
            <input
              v-model="formData.taxExemptionNumber"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="TAX-EX-001"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Discount Percent</label>
            <input
              v-model="formData.discountPercent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <!-- Additional Information Tab -->
      <div v-if="activeTab === 'additional'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Additional Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Assigned Sales Rep</label>
            <input
              v-model="formData.assignedSalesRep"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Sales Representative Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <input
              v-model="formData.source"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Website, Referral, Trade Show"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <input
            v-model="tagsInput"
            type="text"
            @keydown.enter.prevent="addTag"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter tags separated by commas or press Enter"
          />
          <div class="mt-2 flex flex-wrap gap-2">
            <span
              v-for="(tag, index) in formData.tags"
              :key="index"
              class="inline-flex items-center px-2 py-1 text-xs font-medium bg-sap-blue text-white rounded-full"
            >
              {{ tag }}
              <button
                type="button"
                @click="removeTag(index)"
                class="ml-1 text-white hover:text-gray-200"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="handleCancel"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="props.loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.loading ? 'Saving...' : isEdit ? 'Update Customer' : 'Create Customer' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import { CustomerStatus, CustomerType, PaymentTerms, Currency, TaxExemption } from '../types'
import type { Customer, CustomerFormData } from '../types'

interface Props {
  customer?: Customer | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: CustomerFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  customer: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const isEdit = computed(() => !!props.customer)

// Tab management
const activeTab = ref('basic')
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'contact', name: 'Contact Information' },
  { id: 'addresses', name: 'Addresses' },
  { id: 'financial', name: 'Financial Information' },
  { id: 'additional', name: 'Additional Information' },
]

// Form data
const formData = reactive<CustomerFormData>({
  customerCode: '',
  customerName: '',
  companyName: '',
  status: CustomerStatus.ACTIVE,
  type: CustomerType.REGULAR,
  industry: '',
  website: '',
  phone: '',
  email: '',
  fax: '',
  addresses: [],
  contacts: [],
  creditLimit: 0,
  currentBalance: 0,
  paymentTerms: PaymentTerms.NET_30,
  currency: Currency.USD,
  taxExemption: TaxExemption.NONE,
  taxExemptionNumber: '',
  discountPercent: 0,
  notes: '',
  tags: [],
  assignedSalesRep: '',
  source: '',
})

// Primary contact (not in CustomerFormData, so we'll handle it separately)
const primaryContact = reactive({
  firstName: '',
  lastName: '',
  position: '',
  email: '',
  phone: '',
  mobile: '',
  notes: '',
})

// Tags input
const tagsInput = ref('')

// Computed properties
const availableCredit = computed(() => {
  return Math.max(0, formData.creditLimit - formData.currentBalance)
})

// Methods
const addContact = () => {
  formData.contacts.push({
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    mobile: '',
    isPrimary: false,
    notes: '',
  })
}

const removeContact = (index: number) => {
  formData.contacts.splice(index, 1)
}

const addAddress = () => {
  formData.addresses.push({
    type: 'BILLING',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    isDefault: false,
    phone: '',
    email: '',
  })
}

const removeAddress = (index: number) => {
  formData.addresses.splice(index, 1)
}

const addTag = () => {
  const tag = tagsInput.value.trim()
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag)
    tagsInput.value = ''
  }
}

const removeTag = (index: number) => {
  formData.tags.splice(index, 1)
}

const resetForm = () => {
  formData.customerCode = ''
  formData.customerName = ''
  formData.companyName = ''
  formData.status = CustomerStatus.ACTIVE
  formData.type = CustomerType.REGULAR
  formData.industry = ''
  formData.website = ''
  formData.phone = ''
  formData.email = ''
  formData.fax = ''
  formData.addresses = []
  formData.contacts = []
  formData.creditLimit = 0
  formData.currentBalance = 0
  formData.paymentTerms = PaymentTerms.NET_30
  formData.currency = Currency.USD
  formData.taxExemption = TaxExemption.NONE
  formData.taxExemptionNumber = ''
  formData.discountPercent = 0
  formData.notes = ''
  formData.tags = []
  formData.assignedSalesRep = ''
  formData.source = ''

  // Reset primary contact
  primaryContact.firstName = ''
  primaryContact.lastName = ''
  primaryContact.position = ''
  primaryContact.email = ''
  primaryContact.phone = ''
  primaryContact.mobile = ''
  primaryContact.notes = ''
}

// Watch for customer changes to populate form
watch(
  () => props.customer,
  (customer) => {
    if (customer) {
      // Populate form with customer data
      formData.customerCode = customer.customerCode
      formData.customerName = customer.customerName
      formData.companyName = customer.companyName || ''
      formData.status = customer.status
      formData.type = customer.type
      formData.industry = customer.industry || ''
      formData.website = customer.website || ''
      formData.phone = customer.phone
      formData.email = customer.email
      formData.fax = customer.fax || ''
      formData.addresses = customer.addresses.map(({ id, ...address }) => address)
      formData.contacts = customer.contacts.map(({ id, ...contact }) => contact)
      formData.creditLimit = customer.financial.creditLimit
      formData.currentBalance = customer.financial.currentBalance
      formData.paymentTerms = customer.financial.paymentTerms
      formData.currency = customer.financial.currency
      formData.taxExemption = customer.financial.taxExemption
      formData.taxExemptionNumber = customer.financial.taxExemptionNumber || ''
      formData.discountPercent = customer.financial.discountPercent
      formData.notes = customer.notes || ''
      formData.tags = [...customer.tags]
      formData.assignedSalesRep = customer.assignedSalesRep || ''
      formData.source = customer.source || ''

      // Set primary contact from first primary contact
      const primary = customer.contacts.find((c) => c.isPrimary)
      if (primary) {
        primaryContact.firstName = primary.firstName
        primaryContact.lastName = primary.lastName
        primaryContact.position = primary.position
        primaryContact.email = primary.email
        primaryContact.phone = primary.phone
        primaryContact.mobile = primary.mobile || ''
        primaryContact.notes = primary.notes || ''
      }
    } else {
      // Reset form for new customer
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  try {
    // Validate required fields
    if (!formData.customerCode.trim()) {
      alert('Customer code is required')
      return
    }
    if (!formData.customerName.trim()) {
      alert('Customer name is required')
      return
    }
    if (!formData.phone.trim()) {
      alert('Phone is required')
      return
    }
    if (!formData.email.trim()) {
      alert('Email is required')
      return
    }
    if (!primaryContact.firstName.trim()) {
      alert('Primary contact first name is required')
      return
    }
    if (!primaryContact.lastName.trim()) {
      alert('Primary contact last name is required')
      return
    }
    if (!primaryContact.email.trim()) {
      alert('Primary contact email is required')
      return
    }
    if (!primaryContact.phone.trim()) {
      alert('Primary contact phone is required')
      return
    }

    // Add primary contact to contacts array
    const contactsWithPrimary = [
      {
        ...primaryContact,
        isPrimary: true,
      },
      ...formData.contacts,
    ]

    emit('submit', { ...formData, contacts: contactsWithPrimary })
  } catch (error) {
    console.error('Form submission error:', error)
    alert('An error occurred while submitting the form')
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>
