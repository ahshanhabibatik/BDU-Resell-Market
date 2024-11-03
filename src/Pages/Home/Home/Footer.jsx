const Footer = () => {
    return (
        <footer className=" text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {/* Logo & About Section */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Resell Market</h2>
                    <p className="text-gray-400 leading-relaxed">
                        We create beautiful web experiences for users worldwide, specializing in
                        modern, responsive designs that adapt to any device.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-white">Home</a></li>
                        <li><a href="#" className="hover:text-white">About</a></li>
                        <li><a href="#" className="hover:text-white">Services</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                    </ul>
                </div>

                {/* Contact & Social Media */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="text-gray-400">Kaliakori,Gazipur,Dhaka,Bangladesh</p>
                    <p className="text-gray-400">Email: 1902037@icte.bdu.ac.bd</p>
                    <p className="text-gray-400">Phone: (+88) 01920806399</p>

                    {/* Social Media Icons */}
                    <div className="flex space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24H12.82v-9.294H9.692V11.07h3.128V8.41c0-3.1 1.892-4.788 4.659-4.788 1.325 0 2.464.098 2.795.143v3.238h-1.917c-1.504 0-1.795.716-1.795 1.763v2.311h3.587l-.467 3.636H16.56V24h6.115c.73 0 1.325-.593 1.325-1.325V1.325C24 .593 23.406 0 22.675 0z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M23.954 4.569c-.885.392-1.833.656-2.825.775 1.014-.61 1.794-1.574 2.163-2.723-.949.555-2.002.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-2.717 0-4.917 2.2-4.917 4.917 0 .39.045.765.127 1.124-4.083-.205-7.698-2.16-10.126-5.134-.422.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.928-.085.627 1.956 2.445 3.377 4.604 3.418-1.68 1.32-3.808 2.105-6.102 2.105-.396 0-.786-.023-1.17-.067 2.179 1.396 4.768 2.209 7.557 2.209 9.054 0 14.002-7.496 14.002-13.986 0-.213-.005-.425-.014-.637.961-.695 1.8-1.56 2.457-2.548l-.047-.02z" />
                            </svg>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                                <path d="M12 2.163c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18.25c-4.555 0-8.25-3.695-8.25-8.25s3.695-8.25 8.25-8.25 8.25 3.695 8.25 8.25-3.695 8.25-8.25 8.25zm-1.25-13.063c-1.597 0-2.888 1.291-2.888 2.888s1.291 2.888 2.888 2.888 2.888-1.291 2.888-2.888-1.291-2.888-2.888-2.888zm0 4.5c-.89 0-1.612-.722-1.612-1.612s.722-1.612 1.612-1.612 1.612.722 1.612 1.612-.722 1.612-1.612 1.612zm4.888 6.75c-.48-.756-1.286-1.25-2.138-1.25h-5.5c-.852 0-1.658.494-2.138 1.25-.314.494-.444 1.124-.376 1.75h10.527c.067-.626-.062-1.256-.375-1.75z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} Your Brand. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
