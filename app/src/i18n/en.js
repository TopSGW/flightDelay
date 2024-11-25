/* eslint max-len: ["error", 250] */

const translationsEn = {
  // Claim form - claim types
  'claimTypes.delay': 'My flight had a delay',
  'claimTypes.refused': 'I was refused boarding',
  'claimTypes.flight-cancelled': 'My flight was cancelled',
  //
  // Claim form - delays
  'delays.2hours': '2 to 3 hours',
  'delays.4hours': '3 to 4 hours',
  'delays.6hours': 'more than 4 hours',
  //
  // Claim form - salutations
  'salutations.mr': 'Mister',
  'salutations.mrs': 'Miss',
  //
  // Claim form - Stepper headers
  'claimform.type-of-claim': 'Type of claim',
  'claimform.initial-flight': 'Initial flight',
  'claimform.connecting-flight': 'Additional flight',
  'claimform.your-details': 'Your details',
  'claimform.remarks': 'Remarks',
  'claimform.summary': 'General terms and conditions',
  //
  // Claim form - fields
  'claimform.flight-date': 'Flight date',
  'claimform.do-you-know-the-flight-number': 'Do you know the flight number?',
  'claimform.yes': 'Yes',
  'claimform.no': 'No',
  'claimform.flight-number': 'Flight number',
  'claimform.enter-flightNumber': 'Enter your flight number here',
  //
  'claimform.departure': 'Departure',
  'claimform.departure-city': 'City of departure',
  'claimform.enter-departure-city': 'Enter the city of departure here',
  'claimform.departure-airport': 'Airport of departure',
  'claimform.enter-departure-airport': 'Enter the airport of departure here',
  //
  'claimform.arrival': 'Arrival',
  'claimform.arrival-city': 'City of arrival',
  'claimform.enter-arrival-city': 'Enter the city of arrival here',
  'claimform.arrival-airport': 'Airport of arrival',
  'claimform.enter-arrival-airport': 'Enter the airport of arrival here',
  //
  'claimform.airline': 'Airline',
  'claimform.enter-airline': 'Enter the airline here',
  'claimform.delay': 'Delay for this flight',
  'claimform.has-a-connecting-flight': 'I continued my trip with another flight',
  //
  'claimform.salutation': 'Salutation',
  'claimform.last-name': 'Surname',
  'claimform.enter-last-name': 'Enter your surname here',
  'claimform.first-name': 'First name',
  'claimform.enter-first-name': 'Enter your first name here',
  'claimform.street': 'Street',
  'claimform.enter-street': 'Enter your street here',
  'claimform.house-number': 'House number',
  'claimform.enter-house-number': 'Enter your house number here',
  'claimform.box-number': 'Mailbox number',
  'claimform.enter-box-number': 'Enter your mailbox number here',
  'claimform.postal-code': 'Postal code',
  'claimform.enter-postal-code': 'Enter your postal code here',
  'claimform.city': 'City',
  'claimform.enter-city': 'Enter your city here',
  'claimform.country': 'Country',
  'claimform.enter-country': 'Enter your country here',
  'claimform.email': 'Email address',
  'claimform.enter-email': 'Enter your email address here',
  'claimform.phone': 'Phone number',
  'claimform.enter-phone': 'Enter your phone number here',
  'claimform.add-remarks': 'Would you like to add remarks concerning this claim?',
  'claimform.enter-add-remarks': 'Add your remarks here',
  'claimform.agree-with-terms-and-conditions': 'I have read the {url} and agree with the content.',
  'claimform.submit-claim': 'Submit your claim',
  'claimform.next': 'Next',
  'claimform.back': 'Back',
  'claimform.restart': 'Submit a new claim',
  //
  // Claim form submitted page
  'claimform.submitted-succesfully-header': 'Your claim has been submitted and will be processed soon.',
  'claimform.submitted-succesfully-text': 'Thank you for your confidence in Boarding Claims.',
  //
  // Contact form - fields
  'contact-form.name': 'Name',
  'contact-form.enter-name': 'Enter your name here',
  'contact-form.email': 'Email address',
  'contact-form.enter-email': 'Enter your email address here',
  'contact-form.subject': 'Subject',
  'contact-form.enter-subject': 'Enter the subject of the message here',
  'contact-form.message': 'Message',
  'contact-form.enter-message': 'Enter your message here',
  'contact-form.send': 'Send',
  //
  // Contact form submitted page
  'contactform.submitted-succesfully-header': 'Your message has been sent and will be answered soon',
  'contactform.submitted-succesfully-text': 'Thank you for contacting us.',
  //
  // Header
  'header.header-quote.header': 'Problems with your flight?',
  'header.header-quote.text': 'Was your flight delayed, cancelled or overbooked? You may be entitled to compensation of up to €600 per person.',
  'header.cta-button': 'Claim now your compensation',
  //
  // Navigation
  'navigation.home': 'Home',
  'navigation.about-us': 'About us',
  'navigation.mode-of-operation': 'How we work',
  'navigation.your-rights': 'Your rights',
  'navigation.faq': 'FAQ',
  'navigation.contact': 'Contact',
  'navigation.terms-and-conditions': 'General terms and conditions',
  //
  // Footer
  'footer.who-we-are': 'We are ...',
  'footer.explore': 'Explore',
  'footer.company': 'Company',
  'footer.security': 'Security and privacy',
  // Social Media
  'social-media.facebook': ' Like us on',
  'social-media.twitter': 'Follow us on',
  'social-media.instagram': 'Follow us on',
  //
  // Carousel
  'carousel.carousel-title-1': 'Flight delayed?',
  'carousel.carousel-subtitle-1': 'Make sure your compensation won\'t be delayed as well.',
  'carousel.carousel-title-2': 'Flight cancelled?',
  'carousel.carousel-subtitle-2': 'Don\'t have your compensation cancelled as well.',
  'carousel.carousel-title-3': 'Flight rebooked?',
  'carousel.carousel-subtitle-3': 'You\'re entitled to more than just a ticket.',
  //
  // Validation
  'validation.flight-date-not-past-last-flight-date': 'The flight date should be after the flight date of the initial flight',
  'validation.required-field': 'This is a required field. Please enter a value.',
  'validation.date-before': 'The date should be before {date}',
  'validation.email': 'Not a valid email address.',
  'validation.min-length': 'The value {name} should contain at least {lenght} characters.',
  'validation.alphaNum': 'The value {name} should only contain letters or numbers.',
  'validation.alphaDash': 'The value {name} should only contain letters, numbers or a dash.',
  'validation.phoneNumber': 'The value {name} should only contain letters, numbers, a blank or a dash.',
  'validation.validString': 'The value {name} should be a string.',
  //
  // Validation components
  'error.validation.component.complainant': 'Your details',
  'error.validation.component.flights': 'Flight information',
  'error.validation.component.flights.initial': 'Initial flight information',
  'error.validation.component.flights.connecting': 'Connecting flight information',
  'error.validation.component.claim': 'Claim',
  'error.validation.component.contact': 'Contact request',
  //
  // Errors
  'error.validation-failed': 'The validation for {component} failed.',
  'error.server': 'Something went wrong submitting your claim. Please try again or contact us via the contact page.',
  'error.unknown': 'Something went wrong registering your claim, please accept our apologies. Please try again or contact us via the contact page.',
  //
  // Info fields and messages
  'info.claimform.flight-fields': 'The following fields concern the flight information. If you can\'t find your flight information, please add your flight details in \'Remarks\'',
};

export default translationsEn;
