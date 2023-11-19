import React from "react";

export default function Footer(){
    return (
        <>
        <footer class="bg-gray-800 text-gray-300">
            <div class="container mx-auto py-8 px-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h3 class="text-xl font-bold mb-4">Company Name</h3>
        <p>About Us</p>
        <p>Contact Us</p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Products</h3>
        <p>Product 1</p>
        <p>Product 2</p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Follow Us</h3>
        <p>Social Media Icons/Links</p>
      </div>
    </div>
    <hr class="my-6 border-gray-600"/>
    <div class="text-center">
      <p>&copy; 2023 Your Company. All Rights Reserved.</p>
      <p>Terms of Service | Privacy Policy</p>
    </div>
  </div>
</footer>
        </>
    )
}