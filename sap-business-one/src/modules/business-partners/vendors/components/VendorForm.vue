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
            <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Code *</label>
            <input
              v-model="formData.code"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="V001"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Name *</label>
            <input
              v-model="formData.name"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Vendor Name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Type *</label>
            <select
              v-model="formData.type"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Type</option>
              <option value="SUPPLIER">Supplier</option>
              <option value="SERVICE_PROVIDER">Service Provider</option>
              <option value="CONTRACTOR">Contractor</option>
              <option value="DISTRIBUTOR">Distributor</option>
              <option value="MANUFACTURER">Manufacturer</option>
              <option value="WHOLESALER">Wholesaler</option>
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
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tax ID *</label>
            <input
              v-model="formData.taxId"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="12-3456789"
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
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Additional notes about the vendor"
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
                v-model="formData.primaryContact.firstName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="John"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                v-model="formData.primaryContact.lastName"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Doe"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                v-model="formData.primaryContact.position"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Manager"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                v-model="formData.primaryContact.email"
                type="email"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                v-model="formData.primaryContact.phone"
                type="tel"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="+1-555-123-4567"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
              <input
                v-model="formData.primaryContact.mobile"
                type="tel"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="+1-555-987-6543"
              />
            </div>
          </div>

          <div class="mt-3">
                <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  v-model="formData.primaryContact.notes"
                  rows="2"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Additional notes about this contact"
                ></textarea>
              </div>
        </div>

        <!-- Additional Contacts -->
        <div>
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
      </div>

      <!-- Addresses Tab -->
      <div v-if="activeTab === 'addresses'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Addresses</h3>

        <div class="flex justify-between items-center mb-3">
          <h4 class="text-sm font-medium text-gray-900">Vendor Addresses</h4>
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
          No addresses added yet. Click "Add Address" to add vendor addresses.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(address, index) in formData.addresses"
            :key="index"
            class=" rounded-lg p-4 border border-gray-200"
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
                <label class="block text-sm font-medium text-gray-700 mb-1">Street</label>
                <input
                  v-model="address.street"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="123 Main Street"
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
                <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  v-model="address.country"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="USA"
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
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  v-model="address.phone"
                  type="tel"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="+1-555-123-4567"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Fax</label>
                <input
                  v-model="address.fax"
                  type="tel"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="+1-555-123-4568"
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
            <select
              v-model="formData.financial.currency"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Currency</option>
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CHF">CHF - Swiss Franc</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Credit Limit</label>
            <input
              v-model="formData.financial.creditLimit"
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
              v-model="formData.financial.currentBalance"
              type="number"
              min="0"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
            <input
              v-model="formData.financial.paymentTerms"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Net 30"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Discount Percent</label>
            <input
              v-model="formData.financial.discountPercent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tax Code</label>
            <input
              v-model="formData.financial.taxCode"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="TAX001"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Tax Percent</label>
            <input
              v-model="formData.financial.taxPercent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <!-- Banking Information -->
        <div class="mt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-3">Banking Information</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
              <input
                v-model="formData.financial.bankAccount"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="1234567890"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
              <input
                v-model="formData.financial.bankName"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Bank of America"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bank Branch</label>
              <input
                v-model="formData.financial.bankBranch"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Main Branch"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">SWIFT Code</label>
              <input
                v-model="formData.financial.swiftCode"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="BOFAUS3N"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
              <input
                v-model="formData.financial.iban"
                type="text"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="US64 BOFA 1234 5678 9012 34"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Details Tab -->
      <div v-if="activeTab === 'additional'" class="p-4">
        <h3 class="text-base font-medium text-gray-900 mb-4">Additional Details</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
            <input
              v-model="formData.businessHours"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="9:00 AM - 5:00 PM"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <input
              v-model="formData.industry"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Manufacturing"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
            <select
              v-model="formData.companySize"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">Select Size</option>
              <option value="SMALL">Small (1-50 employees)</option>
              <option value="MEDIUM">Medium (51-200 employees)</option>
              <option value="LARGE">Large (201+ employees)</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Years in Business</label>
            <input
              v-model="formData.yearsInBusiness"
              type="number"
              min="0"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="10"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Special Requirements</label>
          <textarea
            v-model="formData.specialRequirements"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Any special requirements or certifications needed"
          ></textarea>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
          <textarea
            v-model="formData.internalNotes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Internal notes for staff reference"
          ></textarea>
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
        {{ props.loading ? 'Saving...' : isEdit ? 'Update Vendor' : 'Create Vendor' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import { VendorType, VendorStatus, Currency } from '../types'
import type { Vendor, VendorFormData } from '../types'

interface Props {
  vendor?: Vendor | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: VendorFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  vendor: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const isEdit = computed(() => !!props.vendor)

// Tab management
const activeTab = ref('basic')
const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'contact', name: 'Contact Information' },
  { id: 'addresses', name: 'Addresses' },
  { id: 'financial', name: 'Financial Information' },
  { id: 'additional', name: 'Additional Details' },
]

// Form data
const formData = reactive<VendorFormData>({
  code: '',
  name: '',
  type: VendorType.SUPPLIER,
  status: VendorStatus.ACTIVE,
  taxId: '',
  website: '',
  notes: '',
  primaryContact: {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    mobile: '',
    isPrimary: true,
  },
  contacts: [],
  addresses: [],
  financial: {
    currency: Currency.USD,
    creditLimit: 0,
    currentBalance: 0,
    paymentTerms: '',
    discountPercent: 0,
    taxCode: '',
    taxPercent: 0,
    bankAccount: '',
    bankName: '',
    bankBranch: '',
    swiftCode: '',
    iban: '',
  },
  // Additional fields
  businessHours: '',
  industry: '',
  companySize: '',
  yearsInBusiness: 0,
  specialRequirements: '',
  internalNotes: '',
})

const resetForm = () => {
  formData.code = ''
  formData.name = ''
  formData.type = VendorType.SUPPLIER
  formData.status = VendorStatus.ACTIVE
  formData.taxId = ''
  formData.website = ''
  formData.notes = ''
  formData.primaryContact = {
    firstName: '',
    lastName: '',
    position: '',
    email: '',
    phone: '',
    mobile: '',
    isPrimary: true,
  }
  formData.contacts = []
  formData.addresses = []
  formData.financial = {
    currency: Currency.USD,
    creditLimit: 0,
    currentBalance: 0,
    paymentTerms: '',
    discountPercent: 0,
    taxCode: '',
    taxPercent: 0,
    bankAccount: '',
    bankName: '',
    bankBranch: '',
    swiftCode: '',
    iban: '',
  }
  // Reset additional fields
  formData.businessHours = ''
  formData.industry = ''
  formData.companySize = ''
  formData.yearsInBusiness = 0
  formData.specialRequirements = ''
  formData.internalNotes = ''
}

// Watch for vendor changes to populate form
watch(
  () => props.vendor,
  (vendor) => {
    if (vendor && vendor.primaryContact && vendor.financial) {
      // Populate form with vendor data
      formData.code = vendor.code
      formData.name = vendor.name
      formData.type = vendor.type
      formData.status = vendor.status
      formData.taxId = vendor.taxId
      formData.website = vendor.website || ''
      formData.notes = vendor.notes || ''

      // Primary contact
      formData.primaryContact = {
        firstName: vendor.primaryContact.firstName,
        lastName: vendor.primaryContact.lastName,
        position: vendor.primaryContact.position,
        email: vendor.primaryContact.email,
        phone: vendor.primaryContact.phone,
        mobile: vendor.primaryContact.mobile || '',
        isPrimary: true,
      }

      // Financial information
      formData.financial = {
        currency: vendor.financial.currency,
        creditLimit: vendor.financial.creditLimit,
        currentBalance: vendor.financial.currentBalance,
        paymentTerms: vendor.financial.paymentTerms,
        discountPercent: vendor.financial.discountPercent,
        taxCode: vendor.financial.taxCode,
        taxPercent: vendor.financial.taxPercent,
        bankAccount: vendor.financial.bankAccount || '',
        bankName: vendor.financial.bankName || '',
        bankBranch: vendor.financial.bankBranch || '',
        swiftCode: vendor.financial.swiftCode || '',
        iban: vendor.financial.iban || '',
      }
    } else {
      // Reset form for new vendor
      resetForm()
    }
  },
  { immediate: true },
)

// Contact management
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

// Address management
const addAddress = () => {
  formData.addresses.push({
    type: 'BILLING',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    isDefault: false,
    phone: '',
    fax: '',
  })
}

const removeAddress = (index: number) => {
  formData.addresses.splice(index, 1)
}

const handleSubmit = () => {
  try {
    // Validate required fields
    if (!formData.code.trim()) {
      alert('Vendor code is required')
      return
    }
    if (!formData.name.trim()) {
      alert('Vendor name is required')
      return
    }
    if (!formData.taxId.trim()) {
      alert('Tax ID is required')
      return
    }
    if (!formData.primaryContact.firstName.trim()) {
      alert('Primary contact first name is required')
      return
    }
    if (!formData.primaryContact.lastName.trim()) {
      alert('Primary contact last name is required')
      return
    }
    if (!formData.primaryContact.email.trim()) {
      alert('Primary contact email is required')
      return
    }
    if (!formData.primaryContact.phone.trim()) {
      alert('Primary contact phone is required')
      return
    }

    emit('submit', { ...formData })
  } catch (error) {
    console.error('Form submission error:', error)
    alert('An error occurred while submitting the form')
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>
