const Privacy = () => {
  // Today's date in long format
  const today = "July 23, 2025";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg mt-10 mb-10 transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Privacy Policy</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Last updated: <span className="font-medium">{today}</span>
      </p>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        <strong>Airdrop Infinity</strong> (<span className="italic">Airdrop Infinity</span>, <span className="italic">we</span>, <span className="italic">us</span>, or <span className="italic">our</span>) respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit <a href="https://airdropinfinity.com" className="underline text-blue-600 dark:text-blue-400">airdropinfinity.com</a> (the “Site”), our web applications, or interact with our services. <br /><br />
        <strong>Disclaimer:</strong> By using this Site, you acknowledge and agree that your use is at your sole risk and that Airdrop Infinity assumes no liability whatsoever for any loss, damages, or consequences arising from your use of our Site, services, or third-party interactions, to the fullest extent permitted by applicable law.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Personal Information:</strong> When you use our services, create an account, participate in airdrops, subscribe to communications, or contact us, we may collect personal identifiers including your name, email address, wallet address, or other contact information.
        </li>
        <li>
          <strong>Non-Personal & Usage Data:</strong> We may automatically collect technical information about your device and usage, such as IP address, browser type, device identifiers, operating system, referral URLs, activity logs, clickstream data, and access times.
        </li>
        <li>
          <strong>Cookies & Tracking Technologies:</strong> We use cookies, pixels, local storage, and similar technologies to enhance your experience, enable core functionality, analyze site usage, and support security.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">2. How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>To provide, maintain, operate, and improve our services</li>
        <li>To process your registration, transactions, or participation in airdrops and reward programs</li>
        <li>To communicate with you regarding account activity, product updates, marketing, promotions, or security notices</li>
        <li>To personalize your experience and deliver relevant content</li>
        <li>To monitor and analyze usage trends and site performance</li>
        <li>To comply with legal obligations, prevent fraud, and protect the security of our platform</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">3. How We Share Your Information</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Service Providers:</strong> We may share information with trusted third-party vendors, hosting partners, analytics providers, or technology providers who perform services on our behalf. These parties are obligated to protect your information. <strong>We are not responsible or liable for the acts or omissions of any third parties, including service providers.</strong>
        </li>
        <li>
          <strong>Legal Compliance:</strong> We may disclose information to comply with applicable laws, regulations, legal processes, or enforceable governmental requests; or to detect, prevent, or address fraud, abuse, or security issues.
        </li>
        <li>
          <strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, or sale of all or part of our business or assets, your information may be transferred as part of that transaction. We will notify you of any material changes.
        </li>
        <li>
          <strong>No Selling of Personal Information:</strong> We do <u>not</u> sell or rent your personal information to third parties for monetary or other valuable consideration.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">4. Third-Party Analytics and Advertising</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        We use third-party analytics and advertising services such as Google Analytics, Meta Pixel, Vercel Analytics, and Google AdSense to help us understand usage patterns, improve our services, and deliver relevant ads. These third parties may collect information about your use of our Site through cookies and similar technologies. Please review their respective privacy policies for more information on how they handle your data. <strong>We are not responsible or liable for the privacy practices, data collection, actions, or content of any third-party services.</strong>
      </p>

      {/* --- NEW SECTION: Third-Party Advertising & Ad Networks --- */}
      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">
        5. Third-Party Advertising &amp; Ad Networks
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        <strong>
          Our Site displays advertisements served by third-party ad networks, including but not limited to <a href="https://adsterra.com/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400">Adsterra</a> and Google AdSense. These advertising partners may collect data using cookies or similar technologies to deliver relevant ads and measure performance. Any actions you take by clicking on or interacting with such advertisements are entirely at your own risk. We do not endorse, guarantee, or assume responsibility for the products, services, content, or practices of any advertiser or linked third-party website. Airdrop Infinity is not liable for any loss, damages, or consequences resulting from your interactions with third-party ads or any subsequent activity outside our Site. Please review the privacy policies and terms of any advertising partners or third-party sites you visit.
        </strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">6. Your Privacy Rights & Choices</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Access, Update, or Delete:</strong> You may request to access, correct, update, or delete your personal information by contacting us at <a href="mailto:info.airdropinfinity@gmail.com" className="underline text-blue-600 dark:text-blue-400">info.airdropinfinity@gmail.com</a>. <strong>We do not guarantee the fulfillment of every request, and we shall not be liable for any inability to update, remove, or restrict information.</strong>
        </li>
        <li>
          <strong>Opt-Out:</strong> You may unsubscribe from our marketing communications at any time by using the unsubscribe link in our emails or by contacting us directly.
        </li>
        <li>
          <strong>Cookies:</strong> You may disable cookies via your browser settings. Note that disabling cookies may affect the functionality of our services. <strong>We are not liable for any consequences, loss of service, or data resulting from your decision to disable cookies.</strong>
        </li>
        <li>
          <strong>CCPA/CPRA (California Residents):</strong> If you are a California resident, you have the right to request notice of what categories of personal information we collect, request deletion of your information, and opt out of “sale” of your information (we do not sell your information). You may exercise these rights by contacting us as described above.
        </li>
        <li>
          <strong>Other US States:</strong> Depending on your state of residence, you may have similar rights regarding your data. Please contact us for more information.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">7. Data Security & Disclaimer</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        We employ industry-standard administrative, technical, and physical safeguards to protect your information against loss, theft, unauthorized access, disclosure, alteration, or destruction. <strong>However, we cannot and do not guarantee absolute security of any information transmitted to or from our Site or stored on our systems. You acknowledge and agree that your use of the Site and provision of information is entirely at your own risk. To the fullest extent permitted by law, Airdrop Infinity will not be liable for any data breach, loss, theft, unauthorized access, or any other security incident.</strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">8. Children&apos;s Privacy</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Our services are intended for users who are at least 13 years of age. We do not knowingly collect or solicit information from children under 13. If you believe we have inadvertently collected personal information from a child under 13, please contact us and we will take prompt steps to delete such data. <strong>We are not liable for any misrepresentation of age by users or use of our services by minors.</strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">9. Third-Party Links</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Our Site may contain links to third-party websites or services that are not operated by us. We are not responsible or liable for the privacy practices, data collection, actions, or content of those third parties. Your interactions with such sites are solely between you and those third parties.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">10. Limitation of Liability</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        <strong>To the fullest extent permitted by applicable law, in no event shall Airdrop Infinity, its officers, directors, employees, affiliates, or agents be liable for any direct, indirect, incidental, special, punitive, or consequential damages, loss of data, loss of profits, business interruption, or any other losses or harm arising from or related to your use of (or inability to use) our Site, services, content, or any information provided herein, even if we have been advised of the possibility of such damages. Your sole and exclusive remedy for dissatisfaction with the Site or Privacy Policy is to stop using the Site and services.</strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">11. Changes to This Privacy Policy</h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting the updated policy on this page with the new &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy regularly to stay informed about how we protect your information. <strong>Your continued use of the Site after any changes constitutes acceptance of those changes.</strong>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200">12. Contact Us</h2>
      <p className="text-gray-700 dark:text-gray-300">
        If you have any questions, requests, or concerns regarding this Privacy Policy or our privacy practices, please contact us at <a href="mailto:info.airdropinfinity@gmail.com" className="underline text-blue-600 dark:text-blue-400">info.airdropinfinity@gmail.com</a>.
      </p>
    </div>
  );
};

export default Privacy;
