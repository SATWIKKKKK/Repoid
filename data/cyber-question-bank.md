# CYBERSECURITY INTERVIEW QUESTIONS — 640 Q&A
## End-to-End: Basics to Advanced

---

# PART 1: TOPIC-WISE QUESTIONS (Q1–Q500)

---

## TOPIC 1: NETWORKING FUNDAMENTALS

### Concept MCQ

Q1. What does OSI stand for?
A) Open Systems Interconnection B) Operating System Interface C) Open Security Infrastructure D) Optical Signal Interface
Answer: A — The OSI model is a conceptual framework for understanding network communication.

Q2. How many layers does the OSI model have?
A) 4 B) 5 C) 7 D) 9
Answer: C — The 7 layers are Physical, Data Link, Network, Transport, Session, Presentation, Application.

Q3. Which protocol operates at the Network layer?
A) TCP B) HTTP C) IP D) Ethernet
Answer: C — IP (Internet Protocol) operates at Layer 3, the Network layer.

Q4. What is the purpose of ARP?
A) Assign IP addresses B) Resolve IP addresses to MAC addresses C) Route packets D) Encrypt traffic
Answer: B — Address Resolution Protocol maps an IP address to a physical MAC address on a local network.

Q5. What port does HTTP use by default?
A) 21 B) 22 C) 80 D) 443
Answer: C — HTTP uses port 80. HTTPS uses port 443.

Q6. What is the difference between TCP and UDP?
A) No difference B) TCP is connection-oriented and reliable; UDP is connectionless and faster but unreliable C) UDP is more secure D) TCP is used only for video
Answer: B — TCP provides guaranteed delivery via handshake; UDP sacrifices reliability for speed.

Q7. What is a subnet mask?
A) A firewall rule B) A value that defines which portion of an IP address is the network and which is the host C) A VPN component D) A DNS record
Answer: B — Subnet masks divide IP addresses into network and host portions.

Q8. What does DNS do?
A) Assign MAC addresses B) Translates human-readable domain names to IP addresses C) Routes packets D) Encrypts traffic
Answer: B — Domain Name System resolves names like google.com to IP addresses.

Q9. What is NAT?
A) Network Attack Tool B) Network Address Translation — maps private IP addresses to a public IP for internet communication C) A type of firewall D) A routing protocol
Answer: B — NAT allows multiple devices on a private network to share one public IP address.

Q10. What is the three-way handshake in TCP?
A) SYN, ACK, FIN B) SYN, SYN-ACK, ACK C) HELLO, READY, GO D) CONNECT, CONFIRM, READY
Answer: B — The client sends SYN, server responds SYN-ACK, client confirms with ACK.

Q11. What layer does a switch operate at?
A) Layer 1 B) Layer 2 C) Layer 3 D) Layer 7
Answer: B — Switches operate at the Data Link layer using MAC addresses.

Q12. What layer does a router operate at?
A) Layer 1 B) Layer 2 C) Layer 3 D) Layer 4
Answer: C — Routers operate at the Network layer using IP addresses.

Q13. What is ICMP used for?
A) File transfer B) Email C) Network diagnostic messages like ping and traceroute D) Encryption
Answer: C — Internet Control Message Protocol is used for error reporting and diagnostics.

Q14. What is a VLAN?
A) A virtual private network B) A logical segmentation of a physical network at Layer 2, grouping devices regardless of physical location C) A wireless network D) A firewall zone
Answer: B — VLANs isolate traffic on a shared physical switch infrastructure.

Q15. What is the purpose of DHCP?
A) Resolve domain names B) Automatically assign IP addresses, subnet masks, gateways, and DNS servers to devices C) Route packets D) Encrypt traffic
Answer: B — Dynamic Host Configuration Protocol automates IP configuration for devices.

### Fill in the Blank

Q16. The ________ layer of the OSI model is responsible for end-to-end communication between processes, using ports.
Answer: Transport (Layer 4)

Q17. HTTPS uses ________ to encrypt HTTP traffic.
Answer: TLS (Transport Layer Security)

Q18. A ________ is a 48-bit hardware address assigned to a network interface card, used for Layer 2 communication.
Answer: MAC address

Q19. The ________ protocol is used to send email from a client to a server.
Answer: SMTP (Simple Mail Transfer Protocol)

Q20. IPv6 addresses are ________ bits long, compared to IPv4's 32 bits.
Answer: 128

Q21. A ________ is a network device that connects two different networks and forwards packets between them.
Answer: router

Q22. The ________ record in DNS maps a domain name to an IPv4 address.
Answer: A record

Q23. Port ________ is used by SSH for remote administration.
Answer: 22

Q24. The ________ model has 4 layers: Network Access, Internet, Transport, and Application.
Answer: TCP/IP

Q25. ________ is the process of dividing a larger network into smaller subnetworks to improve performance and security.
Answer: Subnetting

### Scenario

Q26. You notice a large number of SYN packets arriving at your server but no corresponding ACK packets completing the handshake. What attack is this and how do you mitigate it?
Answer: This is a SYN flood attack — a type of Denial of Service. The attacker sends many SYN packets to exhaust the server's half-open connection table. Mitigations: enable SYN cookies (server generates a cryptographic cookie instead of allocating state until the handshake completes), rate-limit incoming SYN packets, use a firewall or DDoS protection service to filter malformed traffic, reduce the SYN-RECEIVED timeout.

Q27. An attacker on the same network segment as a victim intercepts and modifies traffic between the victim and router without either knowing. What attack is this?
Answer: ARP spoofing (or ARP poisoning) — a Man-in-the-Middle attack. The attacker sends gratuitous ARP replies associating their MAC address with the router's IP address, so the victim sends traffic to the attacker instead. Mitigations: Dynamic ARP Inspection (DAI) on managed switches, static ARP entries for critical hosts, encrypted protocols so intercepted traffic is unreadable, network monitoring for duplicate ARP replies.

Q28. You are troubleshooting slow network performance and use Wireshark. You see many TCP retransmissions and duplicate ACKs. What does this indicate?
Answer: Packet loss on the network. TCP detects lost packets via duplicate ACKs (receiver requests retransmission) and retransmits them. Possible causes: network congestion, faulty cable or hardware, MTU mismatch causing fragmentation, or a misconfigured network device. Investigate the network path, check interface error counters, verify cable and hardware integrity, and look for congestion points.

---

## TOPIC 2: CRYPTOGRAPHY

### Concept MCQ

Q29. What is symmetric encryption?
A) Two different keys for encryption and decryption B) The same key used for both encryption and decryption C) Encryption without a key D) Public key encryption
Answer: B — Symmetric encryption is fast but requires secure key distribution.

Q30. What is asymmetric encryption?
A) One key for both operations B) A key pair — public key for encryption, private key for decryption C) No keys needed D) Encryption using hashes
Answer: B — Also called public-key cryptography, used in TLS, SSH, and digital signatures.

Q31. What is AES?
A) A hashing algorithm B) Advanced Encryption Standard — a symmetric block cipher with key sizes of 128, 192, or 256 bits C) An asymmetric algorithm D) A digital signature scheme
Answer: B — AES is the most widely used symmetric cipher, adopted as a US federal standard.

Q32. What is RSA?
A) A symmetric cipher B) A hash function C) An asymmetric public-key cryptosystem based on the difficulty of factoring large numbers D) A protocol
Answer: C — RSA is widely used for key exchange and digital signatures.

Q33. What is a hash function?
A) A reversible encryption function B) A one-way function that maps input of any length to a fixed-size output deterministically C) A key exchange method D) A random number generator
Answer: B — Hash functions are used for integrity checking, password storage, and digital signatures.

Q34. What is MD5?
A) A symmetric cipher B) A cryptographic hash function producing a 128-bit digest, now considered broken for security use C) An asymmetric algorithm D) A key derivation function
Answer: B — MD5 has collision vulnerabilities and should not be used for security-sensitive purposes.

Q35. What is SHA-256?
A) A symmetric cipher B) A member of the SHA-2 family producing a 256-bit hash, widely used in TLS, Bitcoin, and digital signatures C) An asymmetric algorithm D) A block cipher
Answer: B — SHA-256 is currently considered secure and widely deployed.

Q36. What is a digital signature?
A) A handwritten signature on screen B) A cryptographic scheme that proves authenticity and integrity — signed with the sender's private key, verified with their public key C) A certificate D) A hash
Answer: B — Digital signatures provide non-repudiation, authentication, and integrity.

Q37. What is a PKI (Public Key Infrastructure)?
A) A network protocol B) A framework of roles, policies, hardware, software, and procedures to manage digital certificates and public-key encryption C) A firewall type D) A VPN protocol
Answer: B — PKI enables trusted certificate issuance by Certificate Authorities.

Q38. What is a Certificate Authority (CA)?
A) A firewall B) A trusted entity that issues and signs digital certificates, vouching for the identity of certificate holders C) An encryption algorithm D) A DNS server
Answer: B — CAs form the trust anchor of PKI. Examples: DigiCert, Let's Encrypt.

Q39. What is a man-in-the-middle attack in the context of cryptography?
A) Physical access attack B) An attack where the attacker secretly intercepts and potentially alters communications between two parties who believe they are communicating directly C) A brute force attack D) A replay attack
Answer: B — MITM attacks are mitigated by certificate pinning, HSTS, and mutual TLS.

Q40. What is a rainbow table?
A) A type of network switch B) A precomputed table of hash values for common passwords used to reverse hash functions during password cracking C) A cipher D) A key exchange protocol
Answer: B — Rainbow tables are defeated by password salting.

Q41. What is salting in password storage?
A) Encrypting passwords B) Adding a random unique value to each password before hashing to prevent rainbow table attacks and ensure identical passwords produce different hashes C) Hashing twice D) Using symmetric encryption
Answer: B — Each user's password gets a unique random salt stored alongside the hash.

Q42. What is bcrypt?
A) A symmetric cipher B) A password hashing function with a work factor that can be increased to slow brute-force attacks as hardware improves C) A hash for file integrity D) A public key algorithm
Answer: B — bcrypt, scrypt, and Argon2 are preferred for password hashing over fast hashes like SHA.

Q43. What is perfect forward secrecy (PFS)?
A) A type of firewall B) A property ensuring that compromise of long-term keys does not compromise past session keys, achieved using ephemeral key exchange (ECDHE) C) A certificate type D) A VPN feature
Answer: B — PFS ensures past sessions remain secure even if the private key is later compromised.

Q44. What is a block cipher mode of operation?
A) How many blocks are encrypted B) A method defining how a block cipher processes plaintext larger than one block (ECB, CBC, GCM, CTR) C) The key size D) The block size
Answer: B — ECB is insecure, CBC has padding oracle risks, GCM is authenticated and widely used.

Q45. What is TLS and what does it provide?
A) A firewall protocol B) Transport Layer Security — provides confidentiality (encryption), integrity (MAC), and authentication (certificates) for network communication C) A routing protocol D) A VPN
Answer: B — TLS replaced SSL and is used for HTTPS, SMTPS, IMAPS, and more.

### Fill in the Blank

Q46. The ________ algorithm is used for key exchange in TLS, allowing two parties to agree on a shared secret over an insecure channel.
Answer: Diffie-Hellman (or ECDH)

Q47. ________ is the property that a message has not been altered in transit.
Answer: Integrity

Q48. ________ ensures that the sender cannot deny having sent a message.
Answer: Non-repudiation

Q49. An ________ encryption mode produces an authentication tag alongside the ciphertext, combining encryption and integrity protection.
Answer: AEAD (Authenticated Encryption with Associated Data) — e.g., AES-GCM

Q50. ________ is a key derivation function recommended for deriving strong keys from passwords, using iterations and memory-hardness.
Answer: Argon2 (or scrypt, PBKDF2)

Q51. The ________ cipher uses a stream of pseudorandom bits XORed with plaintext, used in TLS 1.2 as ChaCha20.
Answer: stream cipher

Q52. ________ certificates are issued by a CA that is itself signed by a root CA, forming a chain of trust.
Answer: Intermediate

Q53. ________ is a cryptographic protocol providing end-to-end encryption for email.
Answer: PGP (Pretty Good Privacy) or S/MIME

Q54. In RSA, the security relies on the computational difficulty of ________ large numbers.
Answer: factoring

Q55. ________ is the process of verifying that a certificate has not been revoked before trusting it.
Answer: Certificate revocation checking (CRL or OCSP)

### Scenario

Q56. A developer stores user passwords as plain MD5 hashes. What are the risks and how do you fix it?
Answer: MD5 is a fast hash — an attacker with the database can crack common passwords in seconds using rainbow tables or GPU brute force. MD5 also has known collisions. Fix: migrate to bcrypt, scrypt, or Argon2 which are slow by design and include built-in salting. During migration, re-hash passwords when users log in. For users who never log in again, force a password reset.

Q57. Your TLS certificate expired and a user reports a browser warning. What do you do and what caused the issue?
Answer: Expired certificates cause browsers to reject the connection as untrusted. Immediate fix: renew the certificate from your CA and deploy it. Prevention: automate certificate renewal with tools like Certbot (Let's Encrypt) or set up monitoring/alerting for certificate expiry at 30 and 7 days before expiration. Review your certificate inventory — organizations often lose track of certificates across services.

Q58. An attacker has obtained the server's private key but claims they can decrypt all past TLS sessions. Is this correct?
Answer: Only if PFS was not used. If the TLS configuration uses static RSA key exchange, the private key can decrypt all previously recorded sessions. If the configuration uses ephemeral Diffie-Hellman (DHE or ECDHE), each session used a unique ephemeral key, so compromising the long-term private key does not expose past sessions. This is why PFS is mandatory in TLS 1.3.

---

## TOPIC 3: WEB APPLICATION SECURITY

### Concept MCQ

Q59. What is SQL injection?
A) Inserting data into a database B) An attack where malicious SQL code is inserted into a query via user input, allowing attackers to read, modify, or delete database data C) A network attack D) A type of XSS
Answer: B — SQL injection is consistently ranked in OWASP Top 10.

Q60. What is Cross-Site Scripting (XSS)?
A) Injecting SQL into a form B) Injecting malicious scripts into web pages viewed by other users, enabling session hijacking, credential theft, and defacement C) A CSRF attack D) A network packet attack
Answer: B — XSS exploits the trust a user has in a website.

Q61. What is the difference between stored, reflected, and DOM-based XSS?
A) No difference B) Stored XSS persists in the database; reflected XSS is in URL parameters and reflected back; DOM-based XSS occurs entirely in the browser's DOM without server involvement C) Only reflected is dangerous D) DOM-based affects servers
Answer: B — Stored XSS is most severe as it affects every visitor. DOM-based is hardest to detect.

Q62. What is Cross-Site Request Forgery (CSRF)?
A) Injecting scripts B) Tricking a user's browser into making unauthorized requests to a site where they are authenticated, using their existing session credentials C) SQL injection D) A MITM attack
Answer: B — CSRF exploits the trust a site has in a user's browser.

Q63. What is the primary defense against CSRF?
A) Input validation B) Anti-CSRF tokens — a unique unpredictable token per session that must be included in state-changing requests and verified server-side C) Password hashing D) TLS
Answer: B — The SameSite cookie attribute also provides strong CSRF protection.

Q64. What is a path traversal attack?
A) Navigating a graph B) Using sequences like ../../../etc/passwd to access files outside the intended directory C) A SQL injection variant D) A network route attack
Answer: B — Path traversal can expose sensitive files if input is not sanitized.

Q65. What is Server-Side Request Forgery (SSRF)?
A) A CSRF variant B) An attack where the attacker induces the server to make HTTP requests to internal services or arbitrary external URLs, often bypassing firewalls C) XSS on a server D) A DNS attack
Answer: B — SSRF can expose cloud metadata services, internal APIs, and databases.

Q66. What is XML External Entity (XXE) injection?
A) SQL in XML B) An attack exploiting XML parsers that process external entity references, enabling file disclosure, SSRF, or denial of service C) A cookie theft D) JavaScript injection
Answer: B — Fix by disabling external entity processing in XML parsers.

Q67. What is insecure direct object reference (IDOR)?
A) An SQL variant B) A vulnerability where an application exposes internal object identifiers (like user IDs) in URLs or parameters and does not verify authorization before serving the resource C) A CSRF variant D) A header injection
Answer: B — Example: changing /account?id=123 to /account?id=124 to access another user's data.

Q68. What is clickjacking?
A) Hijacking mouse clicks on your own site B) Embedding a target website in an invisible iframe and tricking users into clicking on hidden elements, performing actions on the target site C) Cookie theft D) Form hijacking
Answer: B — Mitigated by the X-Frame-Options header and Content-Security-Policy.

Q69. What is HTTP security header Content-Security-Policy used for?
A) Enforcing HTTPS B) Defining which content sources the browser may load, mitigating XSS by preventing execution of injected scripts C) Rate limiting D) Authentication
Answer: B — CSP is one of the most powerful XSS mitigations available.

Q70. What is OWASP Top 10?
A) A list of top 10 web frameworks B) A regularly updated list of the most critical web application security risks, published by the Open Web Application Security Project C) A compliance standard D) A penetration testing checklist
Answer: B — The OWASP Top 10 is the primary reference for web application security awareness.

Q71. What is a session fixation attack?
A) Fixing bugs in sessions B) An attack where the attacker sets a user's session ID before login and then hijacks their authenticated session after login C) Session timeout D) Cookie theft
Answer: B — Fix: regenerate session ID upon successful authentication.

Q72. What is the HttpOnly cookie flag?
A) Restricts cookies to HTTPS B) Prevents JavaScript from accessing the cookie via document.cookie, mitigating session theft via XSS C) Limits cookie size D) Sets expiry
Answer: B — HttpOnly is a critical defense for session cookies.

Q73. What is the Secure cookie flag?
A) Encrypts the cookie B) Ensures the cookie is only transmitted over HTTPS connections, preventing interception over unencrypted connections C) Restricts JavaScript access D) Sets SameSite policy
Answer: B — Always use Secure flag for authentication cookies.

Q74. What is a prepared statement (parameterized query)?
A) A cached SQL query B) A database query technique that separates SQL code from user input, preventing SQL injection by treating input as data not code C) A stored procedure D) A type of ORM
Answer: B — Prepared statements are the primary defense against SQL injection.

Q75. What is security misconfiguration in web applications?
A) A coding bug B) Leaving default credentials, exposing unnecessary services, revealing verbose error messages, or failing to apply security hardening to servers and frameworks C) A logic flaw D) An authentication bypass
Answer: B — Security misconfiguration is perennially in the OWASP Top 10.

### Fill in the Blank

Q76. The ________ HTTP header prevents browsers from loading the page inside an iframe, protecting against clickjacking.
Answer: X-Frame-Options (or Content-Security-Policy: frame-ancestors)

Q77. ________ encoding converts user input into safe HTML entities (e.g., < becomes &lt;) to prevent XSS.
Answer: Output (HTML) encoding

Q78. A ________ vulnerability allows an attacker to terminate the current SQL query and append their own.
Answer: SQL injection

Q79. The ________ OWASP category covers failures to properly verify a user's identity during login and session management.
Answer: Broken Authentication (or Identification and Authentication Failures)

Q80. ________ is a web vulnerability where the application includes unvalidated user input in HTTP response headers.
Answer: HTTP header injection (or response splitting)

Q81. The ________ flag on a cookie restricts it from being sent with cross-site requests, providing CSRF protection.
Answer: SameSite

Q82. ________ is the practice of sending the maximum acceptable security-related HTTP headers to restrict browser behavior.
Answer: Security headers hardening

Q83. An ________ occurs when a web application redirects users to a URL specified in a parameter without validating it.
Answer: open redirect

Q84. ________ is a browser mechanism that prevents a web page from making requests to a different domain than the one that served the page.
Answer: Same-Origin Policy (SOP)

Q85. ________ is a mechanism allowing servers to explicitly permit cross-origin requests from specific domains.
Answer: CORS (Cross-Origin Resource Sharing)

### Scenario

Q86. A login form submits username and password to /login?user=admin&pass=x. You try: user=admin'-- and log in without a password. What happened and how do you fix it?
Answer: Classic SQL injection authentication bypass. The query was likely: SELECT * FROM users WHERE user='admin'--' AND pass='x'. The -- comments out the password check. Fix: use parameterized queries / prepared statements for all database queries. Never construct SQL strings by concatenating user input. Also implement a WAF as a defense-in-depth layer, and input validation to reject SQL metacharacters.

Q87. A user reports that after visiting a link in an email, their account performed actions they did not initiate. No malware is found on their device. What attack occurred?
Answer: CSRF (Cross-Site Request Forgery). The malicious link caused the victim's browser to send an authenticated request to the target site using the victim's existing session cookie. Fix: implement anti-CSRF tokens for all state-changing operations, use SameSite=Strict or Lax cookie attribute, verify the Origin and Referer headers, and re-authenticate for sensitive operations like password change and fund transfers.

Q88. During a code review, you find: response.write("Hello, " + Request.QueryString["name"]). What is the vulnerability and fix?
Answer: Reflected XSS. The user-supplied name parameter is directly written to the HTML response without encoding. If a user visits the URL with name=<script>alert(document.cookie)</script>, the script executes in other users' browsers. Fix: HTML-encode all output using server-side encoding functions (e.g., HttpUtility.HtmlEncode in .NET, escapeHtml in Node.js). Also implement a Content-Security-Policy header.

---

## TOPIC 4: NETWORK SECURITY

### Concept MCQ

Q89. What is a firewall?
A) A physical barrier B) A security device (hardware or software) that monitors and controls incoming and outgoing network traffic based on predefined security rules C) An IDS D) A VPN
Answer: B — Firewalls enforce network access control policies.

Q90. What is the difference between a stateful and stateless firewall?
A) No difference B) Stateful firewalls track connection state and allow return traffic automatically; stateless firewalls evaluate each packet independently against rules C) Stateless is more secure D) Stateful is for wireless only
Answer: B — Stateful firewalls (also called dynamic packet filtering) are far more common and practical.

Q91. What is an IDS?
A) Internet Domain Service B) Intrusion Detection System — monitors network or host activity for malicious behavior and alerts administrators C) An encryption tool D) A type of firewall
Answer: B — IDS is passive (detects and alerts). IPS is active (detects and blocks).

Q92. What is the difference between NIDS and HIDS?
A) No difference B) Network IDS monitors network traffic across the network segment; Host IDS monitors activity on an individual host (system calls, file access, logs) C) NIDS is more accurate D) HIDS works on networks too
Answer: B — NIDS detects network-level attacks; HIDS detects host-level attacks and insider threats.

Q93. What is a DMZ in network security?
A) A dangerous area B) A perimeter network segment that hosts public-facing services (web servers, mail servers), isolated from the internal network by firewalls C) A type of VLAN D) A VPN zone
Answer: B — DMZ limits the blast radius if a public-facing server is compromised.

Q94. What is a VPN?
A) A physical network B) Virtual Private Network — creates an encrypted tunnel over a public network, extending a private network securely C) A firewall D) A type of proxy
Answer: B — VPNs provide confidentiality, integrity, and authentication for remote access.

Q95. What is IPsec?
A) An application protocol B) A suite of protocols for securing IP communications through authentication and encryption at the Network layer, used in site-to-site VPNs C) A TLS variant D) A routing protocol
Answer: B — IPsec operates in tunnel mode (for VPN gateways) or transport mode (between hosts).

Q96. What is network segmentation?
A) Splitting data into packets B) Dividing a network into isolated segments to limit lateral movement — attackers who compromise one segment cannot easily reach others C) IP subnetting D) Load balancing
Answer: B — Segmentation is a fundamental defense-in-depth strategy.

Q97. What is a proxy server?
A) A DNS server B) An intermediary server that forwards requests from clients to servers, providing caching, anonymity, logging, and filtering C) A VPN D) A firewall
Answer: B — Forward proxies serve clients; reverse proxies serve servers (like load balancers).

Q98. What is port scanning?
A) Painting ports B) Probing a target host to determine which TCP/UDP ports are open, helping attackers identify running services C) A network monitoring technique D) A firewall rule type
Answer: B — Port scanning is used in reconnaissance by both attackers and defenders (vulnerability assessment).

Q99. What is a DDoS attack?
A) Data deletion B) Distributed Denial of Service — overwhelming a target's resources (bandwidth, CPU, connections) with traffic from many compromised sources C) A brute force D) A DNS attack
Answer: B — DDoS attacks are launched from botnets of compromised machines.

Q100. What is DNS poisoning (cache poisoning)?
A) Corrupting DNS server hardware B) Injecting fraudulent DNS records into a resolver's cache, causing users to be directed to malicious IP addresses instead of legitimate ones C) A DDoS variant D) A routing attack
Answer: B — DNSSEC provides cryptographic authentication to prevent DNS poisoning.

Q101. What is a botnet?
A) A group of network engineers B) A network of compromised computers (bots) controlled by an attacker (botmaster) via a command-and-control server, used for DDoS, spam, and data theft C) A distributed database D) A security monitoring system
Answer: B — Botnets are rented on criminal markets for various attacks.

Q102. What is a honeypot?
A) A sweet file share B) A decoy system intentionally designed to attract attackers, detect intrusion attempts, and study attacker techniques without risk to real systems C) A backup server D) A firewall type
Answer: B — Honeypots provide early warning of attacks and intelligence on attacker methods.

### Fill in the Blank

Q103. A ________ firewall operates at the Application layer and can inspect HTTP, FTP, and DNS traffic content.
Answer: Next-Generation Firewall (NGFW) or Application-layer firewall

Q104. ________ is the technique of capturing all network traffic passing through a network interface in promiscuous mode.
Answer: Packet sniffing (or network sniffing)

Q105. ________ is a technique to distribute denial of service traffic across a network of scrubbing centers to absorb attack traffic.
Answer: DDoS mitigation (anycast scrubbing)

Q106. A ________ attack exploits routing protocols (BGP) to redirect internet traffic through an attacker-controlled network.
Answer: BGP hijacking

Q107. ________ is a security model where no device or user is trusted by default, even inside the network perimeter.
Answer: Zero Trust

Q108. Network ________ monitoring records metadata about network flows (source/destination IP, port, bytes, duration) without capturing full packet contents.
Answer: flow (NetFlow or sFlow)

Q109. ________ is a protocol for centralizing authentication, authorization, and accounting in network access control.
Answer: RADIUS (or TACACS+)

Q110. A ________ scan sends a TCP packet with only the SYN flag to identify open ports without completing the handshake.
Answer: SYN (half-open) scan

---

## TOPIC 5: OPERATING SYSTEM AND HOST SECURITY

### Concept MCQ

Q111. What is privilege escalation?
A) Getting admin training B) An attacker gaining higher privileges than initially granted, either vertically (regular user to admin) or horizontally (accessing another user's resources) C) A network attack D) A web vulnerability
Answer: B — Privilege escalation is a critical phase in most attack chains.

Q112. What is a rootkit?
A) A gardening tool B) Malware that gains and hides root/administrator-level access to a system, often by modifying the OS kernel or bootloader C) A type of ransomware D) A network scanner
Answer: B — Rootkits are extremely difficult to detect because they hide their presence from the OS.

Q113. What is the principle of least privilege?
A) Using minimum passwords B) Granting users, processes, and systems only the permissions they need to perform their function — nothing more C) Minimal firewall rules D) Using few services
Answer: B — Least privilege is a fundamental security principle limiting the blast radius of compromise.

Q114. What is ASLR?
A) An antivirus feature B) Address Space Layout Randomization — an OS defense that randomizes memory addresses of processes, making it harder to exploit memory corruption vulnerabilities C) A type of firewall D) A file permission system
Answer: B — ASLR is a key exploit mitigation alongside DEP/NX.

Q115. What is DEP/NX?
A) A disk encryption standard B) Data Execution Prevention / No-eXecute — marks memory regions as non-executable, preventing shellcode from executing in data/stack regions C) A firewall feature D) A kernel module
Answer: B — DEP/NX combined with ASLR significantly raises the cost of exploitation.

Q116. What is a buffer overflow?
A) Too much RAM B) A vulnerability where a program writes more data to a buffer than it can hold, overwriting adjacent memory and potentially overwriting the return address to execute attacker code C) Disk overflow D) Network buffer congestion
Answer: B — Buffer overflows have been exploited for decades and remain relevant in C/C++ code.

Q117. What is UAC (User Account Control) in Windows?
A) User authentication control B) A Windows security feature that limits application software to standard user privileges until an administrator authorizes an elevation C) A firewall D) An antivirus
Answer: B — UAC prompts when administrative actions are required, limiting malware impact.

Q118. What are file permissions in Linux?
A) File ownership only B) A system defining read, write, and execute rights for owner, group, and others for each file and directory C) File encryption D) File compression
Answer: B — Linux permissions are expressed numerically (chmod 755) or symbolically (rwxr-xr-x).

Q119. What is sudo in Linux?
A) A file editor B) A program allowing a permitted user to run commands with superuser (root) privileges as controlled by the /etc/sudoers file C) A shell D) A network tool
Answer: B — Sudo provides granular control over which users can run which commands as root.

Q120. What is a sticky bit in Linux?
A) A memory management feature B) A file permission bit on a directory meaning only the file owner, directory owner, or root can delete or rename files within it (e.g., /tmp) C) A network flag D) A kernel parameter
Answer: B — The sticky bit prevents users from deleting each other's files in shared directories.

Q121. What is Windows Registry?
A) A software store B) A hierarchical database storing configuration settings for the OS, applications, and hardware — a common target for malware persistence C) A file system D) A process manager
Answer: B — Attackers often add registry keys for persistence (Run/RunOnce keys).

Q122. What is a process injection?
A) Running a new process B) A technique where attacker code is injected into the memory space of a legitimate running process to evade detection, using techniques like DLL injection or process hollowing C) An OS patch D) A kernel module
Answer: B — Process injection is heavily used by advanced malware to hide malicious activity.

Q123. What is Secure Boot?
A) A fast boot mode B) A UEFI security standard ensuring only cryptographically signed bootloaders and OS kernels are executed during startup, preventing bootkit infections C) A backup feature D) A disk encryption
Answer: B — Secure Boot prevents rootkits from persisting at the bootloader level.

### Fill in the Blank

Q124. ________ is the Windows security feature that logs events including logon, file access, and process creation to the Event Log.
Answer: Windows Auditing (or Windows Security Event Log)

Q125. In Linux, the ________ file stores user account information including usernames and password hashes.
Answer: /etc/shadow (with hashes); /etc/passwd (with usernames)

Q126. ________ are small programs that run in the OS kernel, having the highest level of system access and often used by rootkits.
Answer: Kernel modules (or device drivers)

Q127. ________ is a Linux security framework providing mandatory access control policies for processes and files.
Answer: SELinux (or AppArmor)

Q128. A ________ is a sequence of exploit techniques chaining multiple vulnerabilities to escalate from user-level to root/system-level access.
Answer: privilege escalation chain (or exploit chain)

Q129. ________ is a Windows technique where an attacker replaces a legitimate DLL in a search path with a malicious one.
Answer: DLL hijacking (or DLL search order hijacking)

Q130. The ________ command in Windows lists all running processes and their details.
Answer: tasklist (or Get-Process in PowerShell)

---

## TOPIC 6: MALWARE AND THREATS

### Concept MCQ

Q131. What is a virus?
A) Any malware B) Malicious code that attaches itself to a legitimate program and replicates when the infected program runs, requiring user action to spread C) Self-replicating without host D) Remote access tool
Answer: B — Viruses require a host file, distinguishing them from worms.

Q132. What is a worm?
A) A virus variant B) Self-replicating malware that spreads across networks autonomously without requiring user action or attaching to a host file C) A Trojan D) A rootkit
Answer: B — WannaCry was a famous worm that spread via the EternalBlue SMB exploit.

Q133. What is a Trojan horse?
A) A network worm B) Malware disguised as legitimate software — the user willingly installs it, not knowing it performs malicious actions C) A self-replicating virus D) A rootkit
Answer: B — Trojans are common in pirated software, email attachments, and fake updates.

Q134. What is ransomware?
A) Spyware B) Malware that encrypts victim data and demands payment (ransom) for the decryption key C) A worm D) A keylogger
Answer: B — Ransomware is one of the most financially damaging cyber threats today.

Q135. What is spyware?
A) Government surveillance B) Malware that secretly monitors user activity (keystrokes, screenshots, browsing) and transmits data to the attacker C) A worm D) Ransomware
Answer: B — Spyware is often bundled with free software or delivered via phishing.

Q136. What is a keylogger?
A) A password manager B) Software or hardware that records keystrokes, capturing passwords, messages, and sensitive data C) A screen recorder D) A network sniffer
Answer: B — Keyloggers can be software-based (malware) or hardware-based (physical device between keyboard and computer).

Q137. What is a Remote Access Trojan (RAT)?
A) A network scanner B) Malware providing the attacker with remote administrative control over the victim's system, including file access, webcam, and command execution C) A firewall bypass D) A worm
Answer: B — Common RATs include DarkComet, njRAT, and Cobalt Strike Beacon.

Q138. What is a zero-day vulnerability?
A) A vulnerability fixed on day zero B) A previously unknown vulnerability for which no patch exists, giving defenders zero days to prepare before it is exploited C) An old vulnerability D) A network bug
Answer: B — Zero-days are highly valuable and used in targeted attacks by nation-states and sophisticated attackers.

Q139. What is an Advanced Persistent Threat (APT)?
A) A fast attack B) A sophisticated, stealthy, long-term attack by a well-resourced adversary (typically nation-state) aiming to maintain persistent access for intelligence gathering C) A ransomware group D) A botnet
Answer: B — APTs use a combination of custom malware, zero-days, and social engineering.

Q140. What is a supply chain attack?
A) Attacking a factory B) Compromising software or hardware in the supply chain (vendors, updates, dependencies) to reach the ultimate targets through trusted channels C) A logistics attack D) A social engineering attack
Answer: B — SolarWinds and the 3CX compromise are famous supply chain attacks.

Q141. What is fileless malware?
A) Malware without code B) Malware that operates entirely in memory without writing files to disk, using legitimate OS tools (PowerShell, WMI, cmd) to execute malicious actions C) A rootkit D) A worm
Answer: B — Fileless malware evades signature-based antivirus by leaving no files on disk.

Q142. What is a command and control (C2) server?
A) A server for IT management B) A server controlled by the attacker through which malware receives instructions, exfiltrates data, and receives updates C) A monitoring server D) A database server
Answer: B — C2 communication is often disguised as legitimate traffic over HTTP/HTTPS.

Q143. What is lateral movement?
A) Moving files between servers B) Techniques attackers use after initial compromise to progressively move through a network, gaining access to additional systems and higher-value targets C) Privilege escalation D) Exfiltration
Answer: B — Lateral movement uses techniques like Pass-the-Hash, remote services, and SMB shares.

Q144. What is data exfiltration?
A) Deleting data B) Unauthorized transfer of data from an organization to an external location controlled by the attacker C) Data backup D) Data encryption
Answer: B — Exfiltration is a key objective in espionage and some ransomware attacks (double extortion).

### Fill in the Blank

Q145. ________ is a technique where malware hides in the firmware of hardware devices (hard drives, NICs, BIOS), surviving OS reinstallation.
Answer: Firmware rootkit (or UEFI rootkit)

Q146. The ________ kill switch was discovered in WannaCry ransomware — registering a specific domain caused the malware to stop spreading.
Answer: domain kill switch

Q147. ________ is a technique where malware injects itself into a legitimate process's memory by creating a suspended process, hollowing its code, and inserting malicious code.
Answer: Process hollowing

Q148. ________ malware uses encryption to change its code on every infection to evade signature detection.
Answer: Polymorphic

Q149. A ________ is a piece of malware that delivers and installs other malware components, often used as the first stage in a multi-stage infection.
Answer: dropper (or loader)

Q150. ________ is the MITRE framework cataloguing adversary tactics, techniques, and procedures (TTPs) used by threat actors.
Answer: MITRE ATT&CK

---

## TOPIC 7: IDENTITY AND ACCESS MANAGEMENT (IAM)

### Concept MCQ

Q151. What is authentication?
A) Granting access B) Verifying the identity of a user or system — confirming you are who you claim to be C) Encrypting credentials D) Managing permissions
Answer: B — Authentication precedes authorization.

Q152. What is authorization?
A) Proving identity B) Determining what an authenticated user is allowed to do — granting or denying access to resources C) Password management D) Session management
Answer: B — Authentication = who are you? Authorization = what can you do?

Q153. What is multi-factor authentication (MFA)?
A) Multiple passwords B) Using two or more independent factors to verify identity: something you know (password), something you have (OTP token), something you are (biometric) C) Multiple usernames D) Backup passwords
Answer: B — MFA significantly reduces account compromise risk even if passwords are stolen.

Q154. What is SSO (Single Sign-On)?
A) One password for everything B) An authentication scheme where a user logs in once and gains access to multiple connected systems without re-authenticating C) A biometric method D) A token type
Answer: B — SSO improves user experience and centralizes access control.

Q155. What is OAuth 2.0?
A) A password protocol B) An authorization framework allowing third-party applications to access a user's resources on a service without sharing credentials, using tokens C) An encryption standard D) A VPN protocol
Answer: B — OAuth is used for "Login with Google/Facebook" integrations.

Q156. What is OpenID Connect?
A) An open network protocol B) An identity layer built on top of OAuth 2.0 that provides authentication (not just authorization) and returns user identity in a JWT (ID token) C) An email protocol D) A VPN
Answer: B — OIDC adds authentication to OAuth's authorization framework.

Q157. What is SAML?
A) A scripting language B) Security Assertion Markup Language — an XML-based standard for exchanging authentication and authorization data between identity providers and service providers C) A database B) An encryption standard
Answer: B — SAML is widely used for enterprise SSO federations.

Q158. What is a JSON Web Token (JWT)?
A) A web cookie B) A compact, URL-safe token format consisting of a header, payload, and signature, used for stateless authentication and authorization C) An encryption key D) A session ID
Answer: B — JWTs are commonly used in APIs and OAuth/OIDC flows.

Q159. What is RBAC?
A) Remote Backup Access Control B) Role-Based Access Control — granting permissions based on roles assigned to users, reducing complexity compared to per-user permissions C) Resource-Based Access Control D) Rule-Based Authentication
Answer: B — RBAC is the most widely used access control model in enterprise systems.

Q160. What is privileged access management (PAM)?
A) Manager access only B) Controls, monitors, and audits privileged account usage (admin, root, service accounts), providing just-in-time access and credential vaulting C) Password management D) IAM for regular users
Answer: B — PAM solutions like CyberArk and BeyondTrust protect the highest-value accounts.

Q161. What is a password manager?
A) A password policy B) A software tool that stores and manages passwords in an encrypted vault, enabling unique strong passwords for every service C) A browser feature D) A MFA type
Answer: B — Password managers are one of the highest-impact security improvements for individuals.

Q162. What is credential stuffing?
A) Sending many passwords B) Using lists of stolen username/password pairs from previous breaches to attempt logins on other services, exploiting password reuse C) Brute force D) Phishing
Answer: B — Defended by MFA, rate limiting, and breach password checks.

Q163. What is a passkey?
A) A master password B) A FIDO2/WebAuthn credential using asymmetric cryptography that binds authentication to a specific website, eliminating phishing and password theft C) A hardware token D) A one-time password
Answer: B — Passkeys are the successor to passwords, supported by Apple, Google, and Microsoft.

### Fill in the Blank

Q164. ________ is an attack where an attacker uses a list of common passwords against one or many accounts.
Answer: Password spraying

Q165. The ________ attack tries every possible password combination for a specific account.
Answer: Brute force

Q166. ________ is a NIST-recommended identity framework that validates digital identity across three assurance levels (IAL1, IAL2, IAL3).
Answer: NIST SP 800-63 (Digital Identity Guidelines)

Q167. ________ is a hardware authentication device (like YubiKey) that provides phishing-resistant MFA via USB or NFC.
Answer: FIDO2 / WebAuthn hardware security key

Q168. In JWT, the ________ section contains claims about the user and is base64-encoded but not encrypted by default.
Answer: payload

Q169. ________ access management provides time-limited, purpose-specific access to privileged resources rather than permanent standing access.
Answer: Just-in-time (JIT)

Q170. A ________ is an account created for use by applications and services rather than human users.
Answer: service account

---

## TOPIC 8: SOCIAL ENGINEERING AND PHISHING

### Concept MCQ

Q171. What is phishing?
A) Legitimate email marketing B) A social engineering attack using deceptive emails (or other messages) to trick recipients into revealing credentials, clicking malicious links, or installing malware C) A network attack D) SQL injection via email
Answer: B — Phishing remains the most common initial access vector.

Q172. What is spear phishing?
A) Generic bulk phishing B) A targeted phishing attack customized for a specific individual or organization using personal information to increase credibility C) Vishing D) Whaling
Answer: B — Spear phishing is used in APT attacks and business email compromise (BEC).

Q173. What is whaling?
A) A large-scale phishing B) Spear phishing targeting high-value individuals — executives (CEO, CFO) — often to authorize wire transfers or expose sensitive business information C) Vishing D) Smishing
Answer: B — Also called CEO fraud or Business Email Compromise (BEC).

Q174. What is vishing?
A) Video phishing B) Voice phishing — using phone calls to impersonate trusted entities (banks, government, IT support) and trick victims into revealing sensitive information C) Email phishing D) SMS phishing
Answer: B — Vishing attacks often exploit urgency and authority.

Q175. What is smishing?
A) Social media phishing B) SMS phishing — using text messages with malicious links or fake notifications to trick victims C) Spear phishing D) Vishing
Answer: B — Smishing exploits the higher click rates on mobile SMS vs. email.

Q176. What is pretexting?
A) Sending emails B) Creating a fabricated scenario (pretext) to manipulate a target into disclosing information or performing actions — e.g., impersonating IT support or auditors C) Malware delivery D) Password guessing
Answer: B — Pretexting requires research and storytelling to be convincing.

Q177. What is baiting?
A) Fishing B) A social engineering attack using something enticing (infected USB drive left in a parking lot, free software download) to lure victims into compromising themselves C) Phishing D) Vishing
Answer: B — The USB drop is a classic baiting technique that still works reliably.

Q178. What is tailgating (piggybacking)?
A) A network attack B) Physically following an authorized person through a secure door without using credentials — exploiting courtesy C) A malware type D) A social media attack
Answer: B — Physical security controls like mantraps and security awareness training combat tailgating.

Q179. What is Business Email Compromise (BEC)?
A) Compromising the email server B) An attack where the attacker impersonates executives or trusted partners via email to trick employees into transferring funds or sensitive data C) A malware type D) An account takeover
Answer: B — BEC has caused tens of billions in financial losses globally.

Q180. What is the most effective defense against social engineering?
A) A better firewall B) Security awareness training — teaching employees to recognize and report social engineering attempts, combined with technical controls (MFA, email filtering) C) Stronger passwords D) Antivirus
Answer: B — Technology alone cannot prevent humans from being manipulated without education.

### Fill in the Blank

Q181. ________ is the practice of searching through discarded documents and materials to find sensitive information.
Answer: Dumpster diving

Q182. ________ attacks create a sense of urgency, fear, or authority to pressure victims into acting without thinking critically.
Answer: Social engineering (specifically using psychological manipulation)

Q183. An ________ attack involves embedding malicious code in a trusted website that is then visited by targeted victims.
Answer: watering hole

Q184. ________ is a technique where attackers send USB drives preloaded with malware to targeted employees by postal mail.
Answer: USB drop attack

Q185. ________ is a phishing technique targeting mobile users via fake app notifications or browser-based pop-ups.
Answer: Mobile phishing (or mishing)

---

## TOPIC 9: PENETRATION TESTING AND RED TEAMING

### Concept MCQ

Q186. What is penetration testing?
A) Testing server load B) An authorized simulated cyberattack against systems to identify exploitable vulnerabilities before real attackers find them C) Monitoring network traffic D) Vulnerability scanning
Answer: B — Penetration testing is a point-in-time evaluation performed with explicit authorization.

Q187. What is the difference between a vulnerability scan and a penetration test?
A) No difference B) Vulnerability scanning automatically identifies known vulnerabilities; penetration testing manually exploits them to demonstrate real-world impact C) Pen testing is automated D) Vulnerability scanning is manual
Answer: B — Scanning is breadth-first; pen testing is depth-first.

Q188. What are the phases of a penetration test?
A) Just hacking B) Reconnaissance, Scanning/Enumeration, Exploitation, Post-Exploitation, Reporting C) Only testing and reporting D) Just exploitation
Answer: B — These phases map broadly to the kill chain and MITRE ATT&CK.

Q189. What is a white box penetration test?
A) Testing white servers B) A test where the tester has full knowledge of the target — architecture, source code, credentials C) A test with no knowledge D) An external test only
Answer: B — White box simulates an insider or developer with access.

Q190. What is a black box penetration test?
A) Testing dark servers B) A test where the tester has no prior knowledge of the target — simulating an external attacker with no inside information C) An internal test D) A test with full knowledge
Answer: B — Black box simulates a real external attacker.

Q191. What is a grey box penetration test?
A) A colorful test B) A test where the tester has partial knowledge — e.g., a regular user account but not admin credentials — simulating an authenticated user or insider C) Full knowledge test D) No-knowledge test
Answer: B — Grey box is the most common type for web application testing.

Q192. What is Metasploit?
A) A firewall B) An open-source framework for developing, testing, and executing exploits, providing a structured environment for penetration testing C) An IDS D) A network scanner
Answer: B — Metasploit is the most widely used exploitation framework.

Q193. What is Nmap?
A) A map drawing tool B) A network scanner used to discover hosts, open ports, running services, and OS fingerprinting C) A vulnerability scanner D) A password cracker
Answer: B — Nmap is the standard tool for network reconnaissance.

Q194. What is Burp Suite?
A) A network scanner B) A web application security testing platform for intercepting, inspecting, modifying, and replaying HTTP/S traffic C) An exploit framework D) A password cracker
Answer: B — Burp Suite is the standard tool for web application penetration testing.

Q195. What is a red team exercise?
A) A team wearing red clothes B) An adversary simulation exercise where a red team uses real attacker TTPs to test an organization's detection and response capabilities end-to-end C) A pen test D) A vulnerability scan
Answer: B — Red team vs. blue team exercises test people, processes, and technology together.

Q196. What is OSINT?
A) Open Security Intelligence B) Open Source Intelligence — gathering information about a target from publicly available sources (websites, social media, WHOIS, job postings) C) Operational Signal Intelligence D) A scanning tool
Answer: B — OSINT is the first step in most penetration tests and real attacks.

Q197. What is a payload in the context of exploitation?
A) The network packet size B) The code that runs on a target system after a successful exploit — ranging from a simple shell to a full-featured RAT C) The vulnerability itself D) The exploit code
Answer: B — Metasploit separates exploits (how you get in) from payloads (what you do once in).

Q198. What is privilege escalation in a pen test context?
A) Getting more money B) After gaining initial access, using vulnerabilities or misconfigurations to gain higher privileges (e.g., local admin to domain admin) C) Scanning for ports D) Network pivoting
Answer: B — PE is a critical phase following initial access.

### Fill in the Blank

Q199. ________ is the technique of using a compromised host as a relay to attack other systems in an otherwise unreachable network segment.
Answer: Pivoting

Q200. ________ is the process of maintaining access to a compromised system across reboots and account changes.
Answer: Persistence

Q201. ________ is a framework defining attacker behavior across 14 tactics, from initial access to impact.
Answer: MITRE ATT&CK

Q202. ________ is a network scanning technique using crafted packets to identify OS type and version.
Answer: OS fingerprinting

Q203. ________ is a tool for automated SQL injection testing and database takeover.
Answer: sqlmap

Q204. A penetration testing report must include ________, providing evidence of exploitation impact to prioritize remediation.
Answer: proof of concept (PoC) and business risk context

Q205. ________ is a technique for extracting credentials from Windows memory using tools like Mimikatz.
Answer: Credential dumping (or LSASS dumping)

---

## TOPIC 10: INCIDENT RESPONSE AND DIGITAL FORENSICS

### Concept MCQ

Q206. What is the incident response lifecycle?
A) Just fixing things B) Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned (PICERL — NIST framework) C) Detection and Patching D) Monitoring and Alerting
Answer: B — NIST SP 800-61 defines the incident response process.

Q207. What is a SIEM?
A) A type of firewall B) Security Information and Event Management — a platform that collects, aggregates, correlates, and analyzes log data from across the organization to detect threats C) An IDS D) A vulnerability scanner
Answer: B — Examples include Splunk, Microsoft Sentinel, IBM QRadar, and Elastic SIEM.

Q208. What is chain of custody in digital forensics?
A) A legal contract B) A documented record of who collected, handled, transferred, and analyzed digital evidence, ensuring its integrity and admissibility in court C) Evidence storage D) Log management
Answer: B — Any break in chain of custody can invalidate evidence in legal proceedings.

Q209. What is a forensic image?
A) A photograph B) A bit-for-bit copy of storage media preserving all data including deleted files and unallocated space, made without altering the original C) A memory dump D) A network capture
Answer: B — Forensic images are made with write blockers to prevent modification.

Q210. What is memory forensics?
A) RAM testing B) Analyzing the contents of a system's volatile memory (RAM) to find running processes, network connections, encryption keys, and malware artifacts C) Hard drive forensics D) Network forensics
Answer: B — Tools like Volatility are used for memory forensics. RAM is volatile and lost on shutdown.

Q211. What is log analysis in incident response?
A) Reviewing application logs only B) Examining security event logs, access logs, network logs, and system logs to reconstruct attacker activity, identify indicators of compromise, and determine scope C) Log backup D) Log deletion
Answer: B — Centralized log management (SIEM) is essential for effective analysis.

Q212. What is containment in incident response?
A) Ignoring the attack B) Taking immediate actions to limit the damage and spread of an incident — isolating affected systems, blocking malicious IPs, revoking compromised credentials C) Fixing vulnerabilities D) Notifying the attacker
Answer: B — Containment comes before eradication to limit damage.

Q213. What is an Indicator of Compromise (IoC)?
A) A security policy B) Evidence that a system has been compromised — malicious IP addresses, file hashes, domain names, registry keys, or unusual network connections C) A vulnerability D) An audit finding
Answer: B — IoCs are shared via threat intelligence feeds (STIX/TAXII format).

Q214. What is threat hunting?
A) Antivirus scanning B) Proactively searching through networks and systems for hidden threats that have evaded existing security controls, before an alert fires C) Incident response D) Vulnerability scanning
Answer: B — Threat hunters use hypotheses, data analytics, and knowledge of attacker TTPs.

Q215. What is the difference between EDR and antivirus?
A) No difference B) Antivirus detects known malware by signatures; EDR (Endpoint Detection and Response) continuously monitors endpoint behavior, detects anomalies, and enables investigation and response C) Antivirus is newer D) EDR only blocks known threats
Answer: B — EDR products include CrowdStrike Falcon, SentinelOne, Microsoft Defender for Endpoint.

### Fill in the Blank

Q216. ________ is the process of restoring systems and services to normal operation after an incident has been contained and eradicated.
Answer: Recovery

Q217. ________ is a file integrity monitoring system that detects unauthorized changes to critical system files.
Answer: FIM (File Integrity Monitoring) — e.g., Tripwire, AIDE

Q218. The ________ phase of incident response involves understanding what happened, why it happened, and how to prevent recurrence.
Answer: Lessons Learned (Post-Incident Review)

Q219. ________ is the technique of injecting known data into a system to test whether logging and detection controls are working.
Answer: Security control testing (or canary tokens)

Q220. ________ is a documented plan defining how an organization responds to specific types of security incidents.
Answer: Incident Response Plan (IRP) or Playbook

Q221. ________ is a process for preserving volatile evidence like RAM, network connections, and running processes before a system is shut down.
Answer: Live forensics (or volatile data collection)

Q222. ________ is the timeline of all events during an incident, reconstructed from logs and forensic evidence.
Answer: Incident timeline

---

## TOPIC 11: CLOUD SECURITY

### Concept MCQ

Q223. What is the shared responsibility model in cloud security?
A) Everyone is responsible for everything B) A framework defining what security the cloud provider manages (physical, hypervisor) and what the customer manages (data, applications, identity, configurations) C) Only the provider is responsible D) Only the customer is responsible
Answer: B — Misunderstanding shared responsibility is a leading cause of cloud breaches.

Q224. What is a cloud misconfiguration?
A) Wrong cloud pricing B) Incorrectly configured cloud resources — open S3 buckets, overly permissive IAM roles, unencrypted databases — that expose data to unauthorized access C) Slow cloud performance D) A billing error
Answer: B — Cloud misconfigurations are responsible for a large proportion of cloud data breaches.

Q225. What is IAM in cloud security?
A) Internet Access Management B) Identity and Access Management — controlling who can access cloud resources and what they can do, using policies, roles, and permissions C) Incident and Alarm Management D) Integrated Application Management
Answer: B — Cloud IAM (AWS IAM, Azure AD, GCP IAM) is fundamental to cloud security.

Q226. What is a cloud security posture management (CSPM) tool?
A) A cloud cost optimizer B) A tool that continuously assesses cloud infrastructure configurations against security best practices and compliance frameworks, alerting on misconfigurations C) A firewall D) An IDS
Answer: B — CSPM tools include Prisma Cloud, Wiz, and AWS Security Hub.

Q227. What is a cloud access security broker (CASB)?
A) A cloud broker marketplace B) Security enforcement point between cloud users and cloud services — providing visibility, data security, threat protection, and compliance for cloud application use C) A VPN D) A firewall
Answer: B — CASBs are especially important for managing SaaS application security.

Q228. What is the AWS instance metadata service (IMDS)?
A) A billing service B) A service running on AWS EC2 instances at 169.254.169.254 that provides instance configuration and temporary credentials — a common SSRF target C) A monitoring service D) A logging service
Answer: B — SSRF attacks against IMDS can steal IAM role credentials. IMDSv2 requires session tokens to mitigate.

Q229. What is container security?
A) Shipping container logistics B) Security practices for building, deploying, and running containers — scanning images for vulnerabilities, using minimal base images, enforcing runtime policies C) Virtual machine security D) Network security
Answer: B — Container security includes image scanning (Trivy, Snyk), runtime protection, and network policies.

Q230. What is Kubernetes RBAC?
A) Kubernetes backup B) Role-Based Access Control in Kubernetes — controlling which users and service accounts can perform which actions on which Kubernetes resources C) A deployment tool D) A network policy
Answer: B — Kubernetes RBAC is critical for limiting blast radius in container environments.

Q231. What is a security group in AWS?
A) An IAM group B) A virtual firewall for EC2 instances that controls inbound and outbound traffic at the instance level using allow rules C) A compliance group D) A user group
Answer: B — Security groups are stateful — if inbound traffic is allowed, the response is automatically allowed.

Q232. What is data encryption at rest vs in transit?
A) Two names for the same thing B) At rest: encrypting stored data (S3, EBS, databases); in transit: encrypting data as it moves across networks (TLS/HTTPS) C) Only one is needed D) Only in transit matters
Answer: B — Both are required for comprehensive data protection.

### Fill in the Blank

Q233. ________ is an AWS service that provides threat detection by analyzing VPC flow logs, CloudTrail, and DNS logs using machine learning.
Answer: Amazon GuardDuty

Q234. ________ is the practice of defining infrastructure and security configurations as code, enabling version control and automated deployment.
Answer: Infrastructure as Code (IaC) — e.g., Terraform, CloudFormation

Q235. ________ scanning checks container images and code repositories for known vulnerable dependencies before deployment.
Answer: Software Composition Analysis (SCA) or vulnerability scanning

Q236. ________ is an AWS feature that provides S3 bucket access logging, object-level logging, and API activity recording.
Answer: AWS CloudTrail (for API logging) and S3 access logging

Q237. ________ is the principle of providing cloud services only within specified geographic regions to meet data residency requirements.
Answer: Data residency (or data sovereignty)

Q238. ________ is a runtime container security technique that monitors and restricts syscalls a container can make to the kernel.
Answer: Seccomp (or AppArmor, gVisor)

---

## TOPIC 12: APPLICATION SECURITY AND SECURE DEVELOPMENT

### Concept MCQ

Q239. What is SDLC in the context of security?
A) Software Delivery Life Cycle B) Secure Development Life Cycle — integrating security activities (threat modeling, code review, security testing) throughout the software development process C) System Design Life Cycle D) Security Data Life Cycle
Answer: B — Security should be built in from design, not bolted on at the end.

Q240. What is threat modeling?
A) Modeling security threats in 3D B) A structured process for identifying, analyzing, and prioritizing security threats to a system during design, before writing code C) Vulnerability scanning D) Penetration testing
Answer: B — STRIDE is a popular threat modeling framework.

Q241. What is STRIDE?
A) A walking technique B) A threat categorization framework: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege C) A firewall approach D) A development methodology
Answer: B — STRIDE was developed by Microsoft for systematic threat identification.

Q242. What is a code review for security?
A) Reviewing code for aesthetics B) Analyzing source code to identify security vulnerabilities (SQL injection, XSS, hardcoded credentials, insecure cryptography) before deployment C) Performance review D) Style guide enforcement
Answer: B — Manual code review and SAST tools complement each other.

Q243. What is SAST?
A) A security framework B) Static Application Security Testing — analyzing source code or compiled binaries without executing the application to find vulnerabilities C) A runtime test D) A network test
Answer: B — SAST tools include SonarQube, Semgrep, Checkmarx, Fortify.

Q244. What is DAST?
A) Database security testing B) Dynamic Application Security Testing — testing a running application by sending it inputs and analyzing responses to find vulnerabilities C) Static code analysis D) Infrastructure testing
Answer: B — DAST tools include OWASP ZAP, Burp Suite's scanner, and Nikto.

Q245. What is IAST?
A) Internal application testing B) Interactive Application Security Testing — using agents instrumented within the application during normal testing to identify vulnerabilities in real time C) Network testing D) A SAST variant
Answer: B — IAST combines benefits of SAST and DAST with lower false-positive rates.

Q246. What is a software bill of materials (SBOM)?
A) A receipt for software purchases B) A formal inventory of all software components, libraries, and dependencies in an application, enabling vulnerability tracking C) A code review D) A deployment checklist
Answer: B — SBOMs became critical after Log4Shell highlighted supply chain risks.

Q247. What is the Log4Shell vulnerability?
A) A shell scripting bug B) A critical zero-day RCE in Apache Log4j (CVE-2021-44228) where attackers could execute arbitrary code by inserting a malicious string into any logged input C) An SQL injection D) An XSS in logs
Answer: B — Log4Shell affected millions of systems and required emergency patching globally.

Q248. What is a dependency vulnerability?
A) A coding style issue B) A known security flaw in a third-party library or component used by an application, which attackers can exploit if not updated C) A network misconfiguration D) An authentication issue
Answer: B — The 2017 Equifax breach exploited an unpatched Apache Struts vulnerability.

Q249. What is DevSecOps?
A) A new department B) Integrating security practices and tools into the DevOps pipeline — shifting security left so it is automated and continuous rather than a gate at the end C) A compliance framework D) A cloud security model
Answer: B — DevSecOps includes SAST, DAST, SCA, secrets scanning in CI/CD pipelines.

Q250. What is secrets management?
A) Keeping passwords in your head B) Securely storing, managing, and rotating sensitive credentials (API keys, passwords, certificates) using dedicated tools rather than hardcoding in source code C) Encryption D) Access control
Answer: B — Tools: HashiCorp Vault, AWS Secrets Manager, Azure Key Vault.

### Fill in the Blank

Q251. ________ scanning detects hardcoded secrets, API keys, and credentials accidentally committed to source code repositories.
Answer: Secret scanning (e.g., GitLeaks, Trufflehog, GitHub secret scanning)

Q252. ________ is a technique for validating all user input to ensure it matches expected formats before processing.
Answer: Input validation

Q253. ________ is the practice of ensuring error messages do not reveal sensitive system information like stack traces or database schema.
Answer: Error handling hardening (or safe error messages)

Q254. ________ is a CI/CD security practice where every code commit automatically triggers security scans.
Answer: Shift-left security (or security in CI/CD pipeline)

Q255. ________ is the OWASP project providing a list of proactive security controls for developers.
Answer: OWASP Top 10 Proactive Controls

---

## TOPIC 13: SECURITY OPERATIONS AND MONITORING

### Concept MCQ

Q256. What is a SOC?
A) A socket B) Security Operations Center — a team of security analysts monitoring, detecting, analyzing, and responding to cybersecurity incidents around the clock C) A system of compliance D) A scanning tool
Answer: B — SOC analysts work in tiers: Tier 1 (alert triage), Tier 2 (investigation), Tier 3 (hunting/response).

Q257. What is threat intelligence?
A) Smart firewalls B) Evidence-based knowledge about existing or emerging threats — including attacker TTPs, malicious indicators, and context — used to inform security decisions C) Security scanning D) Vulnerability data
Answer: B — Threat intelligence feeds provide IoCs (malicious IPs, hashes, domains) to SIEM and firewalls.

Q258. What is SOAR?
A) A monitoring framework B) Security Orchestration, Automation, and Response — platforms that automate repetitive security tasks, orchestrate workflows, and accelerate incident response C) A SIEM D) A vulnerability scanner
Answer: B — SOAR reduces analyst fatigue and mean time to respond (MTTR).

Q259. What is a use case in SIEM?
A) A software feature request B) A detection rule or scenario defining what events or patterns the SIEM should alert on — e.g., multiple failed logins followed by success C) A report template D) An analyst procedure
Answer: B — SIEM use cases must be tuned to balance detection with false positive rates.

Q260. What is mean time to detect (MTTD)?
A) A performance metric B) The average time from when an attacker compromises a system to when the security team detects the intrusion C) A training metric D) A compliance measure
Answer: B — Industry average MTTD has historically been 200+ days. Reducing MTTD is a key SOC goal.

Q261. What is mean time to respond (MTTR)?
A) A development metric B) The average time from detection of an incident to its containment and resolution C) A compliance metric D) A patch management metric
Answer: B — Both MTTD and MTTR are critical KPIs for security operations effectiveness.

Q262. What is a playbook in security operations?
A) A game rulebook B) A documented procedure defining how analysts should respond to specific types of security incidents — step-by-step actions for triage, investigation, and remediation C) A policy document D) A compliance report
Answer: B — Playbooks enable consistent, fast, and correct responses to common incidents.

Q263. What is false positive in security monitoring?
A) A true alarm B) An alert triggered by benign activity that is incorrectly identified as malicious, causing unnecessary analyst effort C) A missed attack D) A low-severity event
Answer: B — High false positive rates cause alert fatigue, where analysts stop trusting alerts.

Q264. What is alert fatigue?
A) Tired analysts B) The desensitization of security analysts due to excessive false positives, leading to real threats being missed or ignored C) Insufficient logging D) Too many users
Answer: B — Alert fatigue is one of the biggest challenges in security operations.

Q265. What is a threat intelligence platform (TIP)?
A) A threat database only B) A system for aggregating, normalizing, and sharing threat intelligence data across tools and teams, enabling operationalization of intelligence C) A SIEM D) A firewall
Answer: B — Examples: MISP, ThreatConnect, Anomali.

### Fill in the Blank

Q266. ________ is a structured method for documenting and sharing threat intelligence using a common language.
Answer: STIX/TAXII (Structured Threat Information eXpression / Trusted Automated eXchange of Intelligence Information)

Q267. ________ hunting uses the hypothesis "assume breach" — proactively looking for attacker activity inside the network before an alert fires.
Answer: Threat hunting

Q268. ________ is a SOC metric measuring the percentage of security incidents that are detected versus those that occurred.
Answer: Detection rate (or coverage)

Q269. A ________ is a notification sent to affected individuals or regulators following a data breach, required by laws like GDPR.
Answer: data breach notification

Q270. ________ is the process of correlating log events from multiple sources to identify a sequence of events that constitutes an attack.
Answer: Log correlation

---

## TOPIC 14: COMPLIANCE, GOVERNANCE, AND RISK

### Concept MCQ

Q271. What is information security risk management?
A) IT budgeting B) The process of identifying, assessing, and treating information security risks to bring them within acceptable levels C) Compliance auditing D) Security monitoring
Answer: B — Risk = Likelihood × Impact. Treatment: accept, avoid, transfer, or mitigate.

Q272. What is GDPR?
A) A networking standard B) General Data Protection Regulation — EU law governing the processing of personal data of EU residents, requiring consent, transparency, breach notification, and data subject rights C) A security framework D) A certification
Answer: B — GDPR violations can result in fines up to 4% of global annual revenue.

Q273. What is PCI-DSS?
A) A cloud standard B) Payment Card Industry Data Security Standard — a set of security requirements for organizations handling credit card data C) An ISO standard D) A US government regulation
Answer: B — PCI-DSS requires encryption, access control, vulnerability management, and monitoring for cardholder data environments.

Q274. What is HIPAA?
A) A networking protocol B) Health Insurance Portability and Accountability Act — US law requiring protection of patient health information (PHI) with administrative, physical, and technical safeguards C) A cloud standard D) A security framework
Answer: B — HIPAA violations can result in civil and criminal penalties.

Q275. What is ISO 27001?
A) A network protocol B) An international standard specifying requirements for establishing, implementing, maintaining, and continuously improving an Information Security Management System (ISMS) C) A US regulation D) A penetration testing standard
Answer: B — ISO 27001 certification demonstrates formal security management maturity.

Q276. What is NIST CSF (Cybersecurity Framework)?
A) A US government mandate B) A voluntary framework providing guidelines for managing cybersecurity risk across five core functions: Identify, Protect, Detect, Respond, Recover C) A compliance standard D) A tool
Answer: B — NIST CSF is widely adopted across industries for structuring security programs.

Q277. What is a risk assessment?
A) A vulnerability scan B) A systematic process for identifying threats, evaluating the likelihood and impact of risks, and determining the priority of security investments C) A compliance audit D) A penetration test
Answer: B — Risk assessments inform security strategy and investment decisions.

Q278. What is a business continuity plan (BCP)?
A) A financial plan B) A documented plan ensuring critical business functions can continue during and after a disaster or major disruption C) A security policy D) A backup plan
Answer: B — BCP and Disaster Recovery (DR) plans together ensure organizational resilience.

Q279. What is RTO and RPO?
A) Network terms B) Recovery Time Objective (maximum tolerable downtime) and Recovery Point Objective (maximum data loss in time) — key metrics for business continuity planning C) Compliance metrics D) Risk metrics
Answer: B — RTO and RPO drive backup frequency and DR architecture decisions.

Q280. What is data classification?
A) Sorting files alphabetically B) Categorizing data by sensitivity (public, internal, confidential, secret) to apply appropriate security controls proportional to the risk C) File naming D) Encryption level
Answer: B — Classification is the foundation of data protection programs.

### Fill in the Blank

Q281. ________ is a compliance framework for US federal information systems, requiring security controls across 20 control families.
Answer: NIST SP 800-53 (or FISMA)

Q282. ________ is the principle that security controls should be evaluated based on the cost of the control versus the cost of the risk being mitigated.
Answer: Risk-based (or cost-benefit analysis)

Q283. SOC 2 Type ________ evaluates the design of controls at a point in time, while Type II evaluates their operating effectiveness over a period.
Answer: Type I (design); Type II (operating effectiveness)

Q284. ________ is the legal obligation to preserve potentially relevant data when litigation is anticipated.
Answer: Legal hold (or litigation hold)

Q285. ________ is the maximum amount of data loss an organization can tolerate, expressed in time.
Answer: Recovery Point Objective (RPO)

---

## TOPIC 15: ADVANCED TOPICS

### Concept MCQ

Q286. What is a side-channel attack?
A) A lateral movement technique B) An attack exploiting information gained from the physical implementation of a system — timing, power consumption, electromagnetic emissions — rather than algorithm weaknesses C) A social engineering attack D) A network attack
Answer: B — Spectre and Meltdown were side-channel attacks exploiting CPU speculative execution.

Q287. What is Spectre/Meltdown?
A) Antivirus software B) Critical CPU vulnerabilities exploiting speculative execution — a side-channel attack allowing user-space programs to read privileged kernel memory C) Ransomware D) Network attacks
Answer: B — These affected nearly all modern CPUs and required both microcode and OS patches.

Q288. What is a hardware security module (HSM)?
A) A RAM module B) A physical computing device that safeguards and manages cryptographic keys, performing encryption and digital signature operations with high security and tamper resistance C) A USB drive D) A security camera
Answer: B — HSMs are used for CA key protection, payment processing, and code signing.

Q289. What is fuzzing?
A) Vague testing B) An automated testing technique that sends malformed, unexpected, or random input to a program to find crashes, memory corruption bugs, and security vulnerabilities C) A type of scanning D) Network testing
Answer: B — Fuzzing discovered vulnerabilities in browsers, OS kernels, and network parsers.

Q290. What is a format string vulnerability?
A) An input validation error B) A vulnerability where user input is passed as the format string to printf-style functions, allowing attackers to read/write arbitrary memory C) A type confusion D) An SQL variant
Answer: B — Format string bugs are common in older C programs and can lead to RCE.

Q291. What is use-after-free?
A) Free software vulnerability B) A memory corruption vulnerability where a program continues using a pointer after the memory it points to has been freed, potentially allowing code execution C) A heap spray D) A stack overflow
Answer: B — Use-after-free is a common bug class in C/C++ exploited in browsers and OS kernels.

Q292. What is return-oriented programming (ROP)?
A) A code review technique B) An advanced exploitation technique that chains together small existing code sequences (gadgets) ending in RET instructions to execute arbitrary logic without injecting new code C) A debugging method D) A disassembly technique
Answer: B — ROP bypasses NX/DEP protections by reusing existing executable code.

Q293. What is heap spray?
A) Spraying a firewall B) An exploitation technique flooding the heap with a large number of copies of shellcode or NOP sleds to increase the probability that a vulnerability redirects execution to attacker code C) A DOS technique D) A buffer overflow
Answer: B — Heap spray is commonly used to exploit browser vulnerabilities.

Q294. What is a hardware implant?
A) Implanted software B) A physically inserted malicious component on a circuit board or device that provides covert access, data interception, or sabotage capabilities C) A physical key D) An RFID chip
Answer: B — Nation-state actors have been reported to use hardware implants in supply chain attacks.

Q295. What is traffic analysis?
A) Reviewing web analytics B) Analyzing patterns in network communication (timing, volume, source/destination) to extract information even when the content is encrypted C) Packet capture D) Log analysis
Answer: B — Tor was designed to resist traffic analysis through onion routing and timing obfuscation.

Q296. What is certificate transparency?
A) Readable certificates B) A system requiring all publicly trusted CAs to log certificates to public append-only logs, enabling detection of mis-issued or rogue certificates C) An encryption method D) A certificate format
Answer: B — Certificate transparency helped detect CA misissuances like the Symantec/Google controversy.

Q297. What is BGP hijacking?
A) Stealing routers B) An attack where an adversary announces ownership of IP prefixes they do not own, rerouting internet traffic through attacker-controlled networks C) A DDoS technique D) A DNS attack
Answer: B — BGP hijacking has been used for espionage and cryptocurrency theft.

Q298. What is the Tor network?
A) A dark web marketplace B) An anonymity network that routes traffic through multiple volunteer relays, encrypting it in layers at each hop to obscure origin and destination C) A VPN D) A proxy service
Answer: B — Tor is used for privacy, censorship circumvention, and is also used by attackers for anonymity.

Q299. What is threat intelligence sharing?
A) Publishing attack methods B) Exchanging information about threats, attack indicators, and TTPs between organizations to collectively improve defenses C) Selling vulnerabilities D) Bug bounty programs
Answer: B — ISACs (Information Sharing and Analysis Centers) facilitate threat intel sharing within industries.

Q300. What is cyber deception?
A) Lying to attackers in person B) Using decoys, fake credentials, and honey tokens distributed throughout the network to detect and misdirect attackers who have gained access C) Social engineering D) Phishing defense
Answer: B — Deception technologies complement detection by generating high-fidelity alerts when attackers touch anything fake.

### Fill in the Blank

Q301. ________ is an exploit technique that bypasses ASLR by finding the base address of a loaded module through an information leak vulnerability.
Answer: ASLR bypass (via information disclosure / heap info leak)

Q302. ________ is a CPU security feature that prevents the processor from executing code in memory pages marked as data.
Answer: NX bit (No-Execute) or DEP (Data Execution Prevention)

Q303. ________ is the practice of using open-source intelligence to track threat actor infrastructure changes and anticipate attacks.
Answer: Threat actor tracking (or threat intelligence analysis)

Q304. ________ is a file format designed to safely represent threat intelligence data in a machine-readable way.
Answer: STIX (Structured Threat Information eXpression)

Q305. ________ encryption encrypts data such that it can only be decrypted by the intended recipient, with the provider having no access.
Answer: End-to-end (E2EE)

Q306. ________ is the security property ensuring an attacker who compromises a session cannot use the same key material to break other sessions.
Answer: Perfect Forward Secrecy (PFS)

Q307. ________ is a technique where an attacker registers domains similar to legitimate ones (typosquatting) to conduct phishing or intercept traffic.
Answer: Domain spoofing (or typosquatting)

Q308. ________ is the practice of testing software for vulnerabilities by providing it with deliberately malformed inputs automatically.
Answer: Fuzzing (or fuzz testing)

Q309. ________ attacks exploit the way web caches handle ambiguous HTTP requests, poisoning cache entries to serve malicious content to victims.
Answer: Web cache poisoning

Q310. ________ is an attack targeting OAuth implementations where the attacker intercepts the authorization code for a resource they control.
Answer: OAuth authorization code interception (or redirect_uri manipulation)

---

# PART 2: ROUND TYPE QUESTIONS (Q311–Q500 topic-wise continued, Q501–Q640 round types)

---

## TOPIC 16: WIRELESS SECURITY

Q311. What is WPA3?
Answer: The latest Wi-Fi security protocol, providing stronger encryption (SAE replacing PSK), protection against offline dictionary attacks, and forward secrecy for enterprise networks.

Q312. What is an evil twin attack?
Answer: Setting up a rogue access point with the same SSID as a legitimate network to intercept traffic from users who connect to it. Mitigated by using VPN and validating certificates on wireless networks.

Q313. What is a deauthentication attack?
Answer: Sending spoofed deauthentication frames (802.11 management frames) to disconnect clients from a legitimate AP, forcing them to reconnect — often used in combination with evil twin attacks or credential capture.

Q314. What is WEP and why is it insecure?
Answer: Wired Equivalent Privacy — the original Wi-Fi encryption standard. It uses RC4 with static keys and weak IVs, making it crackable in minutes. Should never be used.

Q315. What is a KRACK attack?
Answer: Key Reinstallation Attack — exploits the WPA2 four-way handshake by reinstalling an already-in-use key, allowing attackers to decrypt Wi-Fi traffic. Patched in most modern devices.

---

## TOPIC 17: MOBILE SECURITY

Q316. What is certificate pinning in mobile apps?
Answer: Hardcoding the server's certificate or public key in the mobile app so it only trusts that specific certificate, preventing MITM attacks even if a rogue CA certificate is installed on the device.

Q317. What is a jailbreak/root and why is it a security risk?
Answer: Jailbreaking (iOS) or rooting (Android) removes manufacturer security restrictions, bypassing the secure boot chain, removing sandbox isolation, and allowing arbitrary code execution — fundamentally undermining the device security model.

Q318. What is an insecure data storage vulnerability in mobile apps?
Answer: Storing sensitive data (credentials, tokens, PII) in insecure locations — shared preferences, external storage, unencrypted SQLite databases, or log files — accessible to other apps or attackers with device access.

Q319. What is the OWASP Mobile Top 10?
Answer: OWASP's list of most critical mobile application security risks, including improper credential usage, inadequate supply chain security, insecure authentication, insufficient input/output validation, insecure communication, and others.

Q320. What is MDM?
Answer: Mobile Device Management — a solution allowing organizations to remotely manage, monitor, configure, and enforce security policies on employee mobile devices, including remote wipe capability.

---

## TOPIC 18: PHYSICAL SECURITY

Q321. What is a mantrap?
Answer: A physical security control consisting of two interlocking doors creating a small space — the first door must close before the second opens, preventing tailgating into secure areas.

Q322. What is RFID cloning?
Answer: Copying the data from an RFID card (access badge) to a blank card using a reader, enabling unauthorized access to physical spaces protected by RFID. Mitigated by shielded wallets and newer encrypted RFID standards.

Q323. What is shoulder surfing?
Answer: Observing someone's screen, keyboard, or PIN entry pad from nearby to steal credentials or sensitive information. Mitigated by privacy screens and awareness.

Q324. What are security cameras' role in cybersecurity?
Answer: Physical security cameras are themselves IoT devices that need security hardening — change default credentials, update firmware, segment on a separate VLAN, encrypt video streams, and monitor for unauthorized access.

Q325. What is a physical security audit?
Answer: An assessment of physical security controls — access control systems, locks, surveillance cameras, server room security, visitor management, and badge policies — to identify physical vulnerabilities that could lead to cyber compromise.

---

## TOPIC 19: ENCRYPTION AND PKI — ADVANCED

Q326. What is certificate stapling?
Answer: OCSP stapling — the server periodically fetches and caches its own OCSP response from the CA and sends it to clients during the TLS handshake, improving performance and privacy compared to clients querying the OCSP server directly.

Q327. What is HSTS?
Answer: HTTP Strict Transport Security — a response header instructing browsers to only connect to the site over HTTPS for a specified period (max-age), preventing protocol downgrade attacks and cookie hijacking.

Q328. What is a wildcard certificate?
Answer: A certificate covering all subdomains of a domain (*.example.com). Convenient but risky — compromise of one subdomain or the certificate's private key exposes all subdomains.

Q329. What is elliptic curve cryptography (ECC)?
Answer: A public-key cryptography approach based on the mathematics of elliptic curves. ECC achieves equivalent security to RSA with smaller key sizes (e.g., 256-bit ECC ≈ 3072-bit RSA) — faster and more efficient for mobile and IoT.

Q330. What is a hybrid encryption scheme?
Answer: Combining asymmetric encryption (to exchange a session key) with symmetric encryption (for bulk data). TLS uses this: RSA/ECDH exchanges the symmetric key, then AES-GCM encrypts the data. Asymmetric is slow for bulk data; symmetric is fast.

---

## TOPIC 20: THREAT ACTORS AND THREAT LANDSCAPE

Q331. What are the categories of threat actors?
Answer: Nation-state actors (most sophisticated, geopolitical motivations), organized cybercrime (financially motivated, ransomware, fraud), hacktivists (political/ideological motivation, DDoS, defacement), insider threats (current or former employees), script kiddies (using existing tools without deep understanding), and terrorists.

Q332. What is a hacktivist?
Answer: An individual or group conducting cyberattacks for political, social, or ideological reasons — defacing websites, DDoS attacks, data leaks. Examples: Anonymous, Killnet.

Q333. What is an insider threat?
Answer: A security risk from someone inside the organization — employees, contractors, or business partners who misuse their access either maliciously (data theft, sabotage) or negligently (accidental data exposure, falling for phishing).

Q334. What is a cybercriminal marketplace (darknet market)?
Answer: Underground online marketplaces (often on Tor) where cybercriminals buy and sell stolen data, malware, exploit kits, RaaS (Ransomware-as-a-Service), initial access, and credentials.

Q335. What is Ransomware-as-a-Service (RaaS)?
Answer: A business model where ransomware operators provide the ransomware code, infrastructure, and payment processing to affiliates who conduct the attacks in exchange for a percentage of ransoms. Examples: LockBit, REvil, Conti.

---

# PART 3: ROUND TYPE QUESTIONS (Q501–Q640)

---

## ROUND TYPE: SCENARIO QUESTIONS

Q501. You receive an alert that a server is making outbound HTTPS connections to an IP address in a foreign country at 3am. What do you do?
Answer: Treat this as a potential C2 beacon or data exfiltration. Immediately isolate the server from the network to prevent further communication. Capture a memory image for forensics before shutdown. Review process list and network connections at time of alert. Examine which process initiated the connection — check parent-child process relationships. Analyze the destination IP against threat intel feeds. Examine recent file changes and scheduled tasks for persistence mechanisms. Check authentication logs for unauthorized access. Escalate to incident response. Preserve all logs. Notify relevant stakeholders per the incident response plan.

Q502. An employee receives an email from the CEO urgently requesting a $200,000 wire transfer to a new vendor. The email looks legitimate. What should the employee do and what controls would prevent this?
Answer: This is a Business Email Compromise (BEC) / whaling attack. Employee should: never action financial requests via email alone, call the CEO directly using a known number (not from the email), and report to the security team. Controls: dual-approval policy for wire transfers, mandatory out-of-band verification for any new beneficiaries, email authentication (SPF, DKIM, DMARC) to prevent domain spoofing, security awareness training specifically covering CEO fraud, anti-phishing email gateway rules.

Q503. During a penetration test you find an open S3 bucket containing customer data. What do you do?
Answer: Document the finding with evidence (bucket URL, sample data types — avoid downloading more than necessary to prove access). Do not exfiltrate or access more data than needed to demonstrate the vulnerability. Include in your penetration test report as critical severity with business impact assessment. Immediately notify the client during the test (pre-arranged communication protocol). Recommend: enable S3 Block Public Access at account level, review all bucket ACLs and policies, enable AWS Config rules to detect public buckets, implement data classification. Determine if breach notification is required.

Q504. A developer accidentally commits an AWS access key to a public GitHub repository. What needs to happen in the next 30 minutes?
Answer: Immediately rotate (revoke and replace) the exposed AWS access key — assume it has already been found by automated scanners that monitor GitHub for credentials. Review AWS CloudTrail logs for all API calls made with that key starting from the time of commit. Identify any resources accessed or created. Revoke the key before checking logs (priority). Check IAM permissions of that key to understand potential blast radius. If unauthorized activity occurred, treat as a security incident. Remove the credential from GitHub history (though the key is already compromised after public exposure — treat rotation as mandatory regardless). Implement pre-commit hooks and secret scanning in CI/CD to prevent recurrence.

Q505. Your web application is experiencing significantly slower response times and you see a huge spike in traffic from thousands of IPs. What is happening and what do you do?
Answer: This is a Distributed Denial of Service (DDoS) attack. Immediate actions: engage your DDoS mitigation service (Cloudflare, AWS Shield, Akamai). Analyze traffic — is it volumetric (bandwidth flooding), protocol-based (SYN flood), or application layer (HTTP flood targeting specific endpoints)? Enable rate limiting and geo-blocking if applicable. Scale infrastructure if using a CDN. Blackhole routing for the most abusive IP ranges. Identify if this is a smokescreen for another attack happening simultaneously. Communicate status to affected users. Post-incident: review DDoS protection architecture and runbook.

Q506. You find that an employee has been sending large amounts of data via personal Gmail from their work laptop for the past two weeks. How do you handle this?
Answer: Potential insider threat or data exfiltration. Preserve evidence before alerting the employee — capture logs, screenshots, email metadata. Determine the sensitivity of the data sent. Engage HR and Legal immediately — this is a combined security and employment matter. Conduct a forensic investigation of the device (disk image) before it can be wiped. Review the employee's access logs across all systems. Depending on findings: report to law enforcement if criminal. Revoke access immediately once investigation justifies it. Review your DLP (Data Loss Prevention) controls — why wasn't this caught earlier?

Q507. During a code review you find the following: password = "Admin1234!" hardcoded in a configuration file in a repository with 50 contributors. What is your response?
Answer: Hardcoded credential is a critical vulnerability. Immediately rotate the password and any dependent credentials. Assume it has been seen by all 50 contributors and anyone with repository access over its entire history (git log reveals when it was added). Audit access logs for any unauthorized use of that credential. Remove it from the repository including git history (git filter-branch or BFG Repo Cleaner). Move the credential to a secrets manager (HashiCorp Vault, AWS Secrets Manager). Enable secret scanning in the repository and CI/CD pipeline to catch future occurrences. Brief the team on secure credential management.

Q508. An attacker has bypassed authentication on your application by manipulating a JWT token. What likely happened?
Answer: Common JWT attack. Possibilities: algorithm confusion attack — the attacker changed the alg header from RS256 to HS256 and signed with the public key (which is known), and the server verified using the same public key as an HMAC secret; or the alg was changed to none and the server accepted unsigned tokens. Fix: explicitly enforce expected algorithm on the server side, reject tokens with alg:none, use a mature JWT library that does not accept algorithm changes. Additional checks: verify issuer and expiry claims. Never rely solely on JWT validation without server-side session validation for sensitive operations.

Q509. A user reports they were logged out of their account and now cannot log in. They have MFA. Someone from another country accessed their account 2 minutes ago. How did this happen?
Answer: Most likely an EvilProxy-style adversarial MITM phishing attack. Even with TOTP MFA, real-time phishing proxies can intercept both the password and the OTP code and use them immediately before they expire. Possible vectors: phishing link leading to a reverse proxy (Modlishka, Evilginx) that relays credentials to the real site in real time. Response: lock the account, invalidate all sessions, contact the user, investigate the phishing vector. Long-term fix: migrate to phishing-resistant MFA — FIDO2/WebAuthn passkeys or hardware security keys which are bound to the origin URL and cannot be relayed.

Q510. Your SIEM fires an alert: "User account accessed from 5 different countries within 2 hours." What is this and how do you investigate?
Answer: This is an impossible travel alert — physically impossible for a single user to be in 5 countries within 2 hours. Investigate: review login timestamps and IPs, use IP geolocation to confirm countries, check if a VPN or proxy service could explain the anomaly. Contact the user to verify whether they recognize the logins. If unauthorized: immediately disable the account, invalidate all sessions, reset credentials, check what actions were taken during unauthorized sessions, initiate incident response. Review how credentials were obtained — breach notification sites, phishing, credential stuffing.

Q511. You are called in to investigate a healthcare company that found ransomware has encrypted 80% of their servers. What are your priorities?
Answer: Life safety first — if clinical operations are affected, coordinate with clinical staff to switch to paper procedures and ensure patient care continuity. Contain: identify the ransomware family to understand its behavior. Isolate remaining unaffected systems. Identify patient zero — the initial infection vector and timeline. Assess backup integrity — are backups clean and restorable? Engage legal and HIPAA compliance team immediately — breach notification may be required. Contact FBI if applicable. Evaluate decryption options (check nomoreransom.org). Begin recovery from clean backups in isolated environment. Do NOT pay the ransom without legal and law enforcement consultation. Conduct post-incident root cause analysis.

Q512. You are performing a black box pen test and found an SSRF vulnerability in an AWS-hosted application. What do you try?
Answer: SSRF in AWS is a critical finding. Attempt to reach the instance metadata service at http://169.254.169.254/latest/meta-data/ to retrieve IAM role credentials. Try /latest/meta-data/iam/security-credentials/ to list roles and then fetch temporary AWS credentials. These credentials can provide access to AWS services the instance has IAM permissions for — potentially S3, EC2, secrets. Also try to reach internal services (internal APIs, databases, Redis) that are not internet-exposed. Document all findings with careful evidence. Recommend: IMDSv2 (session-token required, prevents SSRF-based metadata access), restrict outbound requests to allowlisted domains, use server-side validation.

---

## ROUND TYPE: ARCHITECTURE / SYSTEM DESIGN QUESTIONS

Q513. Design the security architecture for a new banking application that will handle 5 million users.
Answer: Defense in depth across all layers. Perimeter: DDoS protection (Cloudflare/AWS Shield), WAF for OWASP Top 10, network segmentation separating public-facing, application, and database tiers. Identity: strong MFA (TOTP minimum, passkeys preferred), phishing-resistant for admin accounts, adaptive authentication based on risk signals. Application: OWASP Top 10 mitigations, input validation, output encoding, parameterized queries, CSRF protection, CSP headers. Data: encryption at rest (AES-256) and in transit (TLS 1.3), column-level encryption for PII, tokenization for card numbers (PCI-DSS). Monitoring: SIEM with fraud detection rules, behavioral analytics, transaction anomaly detection. Compliance: PCI-DSS for payments, data residency for GDPR. Incident response: tested playbooks, 24x7 SOC. Regular pen testing and red team exercises.

Q514. Design a zero-trust network architecture for a company with 2,000 remote employees.
Answer: Zero trust: never trust, always verify. No implicit trust based on network location. Identity: strong identity provider (Okta, Azure AD) with MFA for all access, device certificate enrollment (MDM). Access: ZTNA/SDP solution (Zscaler, Cloudflare Access) replacing VPN — per-application access based on identity + device health. Device trust: endpoint management (Intune/JAMF) checking patch level, antivirus status, disk encryption. Network: micro-segmentation — no lateral movement between applications. Logging: all access decisions logged, user behavior analytics. Policy engine: continuous trust evaluation — step-up authentication for sensitive resources. Data: DLP preventing sensitive data egress. Monitoring: SIEM aggregating identity, endpoint, and application logs.

Q515. Design a secrets management solution for a microservices architecture with 200 services on Kubernetes.
Answer: Deploy HashiCorp Vault or AWS Secrets Manager. Each service uses a dedicated service identity (Kubernetes service account) authenticated via Vault's Kubernetes auth method. Vault issues short-lived dynamic secrets (database credentials, AWS IAM credentials) with automatic rotation — secrets expire and are regenerated, eliminating long-lived static credentials. Secrets are injected into pods via the Vault Agent sidecar or Secrets Store CSI driver — never stored in environment variables, ConfigMaps, or container images. Audit all secret access. Enable mTLS between services using Vault PKI for certificate issuance. Implement break-glass procedures for emergency access. Test secret rotation procedures regularly.

Q516. Design a security monitoring architecture for a company generating 10TB of log data per day.
Answer: Log pipeline: collect logs from all sources (servers, network devices, cloud services, applications) via agents (Fluentd, Filebeat). Stream to a high-throughput message queue (Apache Kafka). Process and normalize in a stream processor (Apache Flink or Spark Streaming). Store: hot tier (Elasticsearch/OpenSearch) for recent 90 days querying; cold tier (S3) for long-term retention. SIEM: Elastic SIEM or Splunk with custom detection rules and ML anomaly detection. Correlation: build use cases for known attack patterns (impossible travel, lateral movement, credential stuffing). Alerting: deduplicate and enrich alerts before routing to analysts. SOAR integration: automate tier-1 triage. Dashboard: operational and executive views. Test: regularly inject synthetic attacks to verify detection coverage.

Q517. Design a penetration testing program for a large organization.
Answer: Scope-based program: annual comprehensive internal and external pen test by a third-party firm (black/grey box). Continuous: internal red team conducting ongoing adversary simulation. Web application testing: quarterly for critical applications, annually for all. API testing: every major release. Cloud configuration review: quarterly. Social engineering: annual phishing simulation for all employees, targeted for finance and IT. Bug bounty: public or private program for continuous community testing. Scope, rules of engagement, and emergency contact procedures documented. Findings tracked in vulnerability management system with SLA-based remediation. Retest to verify fixes. Executive report on risk posture trend.

---

## ROUND TYPE: CODING / TECHNICAL QUESTIONS

Q518. Write a Python function to check if a password meets strong password requirements (min 12 chars, uppercase, lowercase, digit, special character).

Answer:
```python
import re

def is_strong_password(password):
    if len(password) < 12:
        return False, "Too short (min 12)"
    if not re.search(r'[A-Z]', password):
        return False, "No uppercase letter"
    if not re.search(r'[a-z]', password):
        return False, "No lowercase letter"
    if not re.search(r'\d', password):
        return False, "No digit"
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return False, "No special character"
    return True, "Strong password"
```

Q519. Write a Python function to hash a password securely using bcrypt.

Answer:
```python
import bcrypt

def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt(rounds=12)
    return bcrypt.hashpw(password.encode('utf-8'), salt)

def verify_password(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed)
```

Q520. Write a function to detect potential SQL injection in a user input string.

Answer:
```python
import re

def detect_sql_injection(user_input: str) -> bool:
    patterns = [
        r"('|\")",
        r"(--|#|/\*)",
        r"\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|OR|AND)\b",
        r"(\bOR\b\s+\d+\s*=\s*\d+)",
        r"(;\s*DROP\s+TABLE)",
    ]
    combined = re.compile('|'.join(patterns), re.IGNORECASE)
    return bool(combined.search(user_input))
```

Q521. Write a Python function to safely make a parameterized SQL query using sqlite3.

Answer:
```python
import sqlite3

def get_user(username: str):
    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()
    # Safe: parameterized query prevents SQL injection
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    result = cursor.fetchone()
    conn.close()
    return result
    # NEVER do: cursor.execute(f"SELECT * FROM users WHERE username = '{username}'")
```

Q522. Write a function to generate a cryptographically secure random token for use as a CSRF token or session ID.

Answer:
```python
import secrets

def generate_secure_token(length: int = 32) -> str:
    return secrets.token_hex(length)

def generate_url_safe_token(length: int = 32) -> str:
    return secrets.token_urlsafe(length)
```

Q523. Write a function to encode output for HTML to prevent XSS.

Answer:
```python
import html

def safe_html_output(user_input: str) -> str:
    return html.escape(user_input, quote=True)

# Example:
# user_input = '<script>alert("xss")</script>'
# safe_html_output(user_input)
# Returns: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

Q524. Write a Python function to verify a JWT token signature using PyJWT.

Answer:
```python
import jwt

def verify_jwt(token: str, public_key: str, expected_algorithm: str = "RS256") -> dict:
    try:
        payload = jwt.decode(
            token,
            public_key,
            algorithms=[expected_algorithm],  # Explicitly specify algorithm
            options={"require": ["exp", "iat", "sub"]}
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise ValueError("Token has expired")
    except jwt.InvalidTokenError as e:
        raise ValueError(f"Invalid token: {e}")
```

Q525. Write a function to check if an IP address is in a list of CIDR blocked ranges.

Answer:
```python
import ipaddress

def is_ip_blocked(ip: str, blocked_cidrs: list) -> bool:
    try:
        ip_addr = ipaddress.ip_address(ip)
        for cidr in blocked_cidrs:
            if ip_addr in ipaddress.ip_network(cidr, strict=False):
                return True
        return False
    except ValueError:
        return True  # Treat invalid IPs as blocked

# blocked = ["192.168.1.0/24", "10.0.0.0/8"]
# is_ip_blocked("192.168.1.100", blocked)  # True
```

Q526. Write a function to perform constant-time comparison to prevent timing attacks on HMAC verification.

Answer:
```python
import hmac
import hashlib

def verify_hmac(message: bytes, signature: bytes, secret: bytes) -> bool:
    expected = hmac.new(secret, message, hashlib.sha256).digest()
    # Use hmac.compare_digest for constant-time comparison
    # Regular == is vulnerable to timing attacks
    return hmac.compare_digest(expected, signature)
```

Q527. Write a function to sanitize a filename to prevent path traversal.

Answer:
```python
import os
import re

def sanitize_filename(filename: str, upload_dir: str) -> str:
    # Remove path separators and null bytes
    filename = os.path.basename(filename)
    filename = re.sub(r'[^\w\s\-.]', '', filename)
    filename = filename.strip('. ')
    if not filename:
        raise ValueError("Invalid filename")
    # Ensure resolved path stays within upload directory
    safe_path = os.path.realpath(os.path.join(upload_dir, filename))
    if not safe_path.startswith(os.path.realpath(upload_dir)):
        raise ValueError("Path traversal detected")
    return safe_path
```

Q528. Write a function to implement rate limiting using a token bucket algorithm.

Answer:
```python
import time
from threading import Lock

class RateLimiter:
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests = {}
        self.lock = Lock()

    def is_allowed(self, client_id: str) -> bool:
        now = time.time()
        with self.lock:
            if client_id not in self.requests:
                self.requests[client_id] = []
            # Remove old requests outside the window
            self.requests[client_id] = [
                t for t in self.requests[client_id] if now - t < self.window
            ]
            if len(self.requests[client_id]) < self.max_requests:
                self.requests[client_id].append(now)
                return True
            return False
```

Q529. Write a Python script to scan a target for open ports using sockets.

Answer:
```python
import socket
from concurrent.futures import ThreadPoolExecutor

def scan_port(host: str, port: int, timeout: float = 1.0) -> bool:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(timeout)
            result = s.connect_ex((host, port))
            return result == 0
    except Exception:
        return False

def port_scan(host: str, start: int, end: int) -> list:
    open_ports = []
    with ThreadPoolExecutor(max_workers=100) as executor:
        results = {port: executor.submit(scan_port, host, port)
                   for port in range(start, end + 1)}
        for port, future in results.items():
            if future.result():
                open_ports.append(port)
    return sorted(open_ports)
```

Q530. Write a function to check if a URL is safe (basic SSRF prevention).

Answer:
```python
import ipaddress
import urllib.parse

def is_safe_url(url: str, allowed_domains: list = None) -> bool:
    try:
        parsed = urllib.parse.urlparse(url)
        if parsed.scheme not in ('http', 'https'):
            return False
        hostname = parsed.hostname
        if not hostname:
            return False
        # Block internal IP ranges
        try:
            ip = ipaddress.ip_address(hostname)
            if ip.is_private or ip.is_loopback or ip.is_link_local:
                return False
        except ValueError:
            pass  # Hostname, not IP — proceed
        if allowed_domains:
            return any(hostname == d or hostname.endswith('.' + d)
                      for d in allowed_domains)
        return True
    except Exception:
        return False
```

---

## ROUND TYPE: CONCEPT MCQ — MIXED (RAPID FIRE)

Q531. What is the primary purpose of DNSSEC?
A) Speed up DNS B) Cryptographically sign DNS records to prevent DNS spoofing and cache poisoning C) Encrypt DNS queries D) Block malicious domains
Answer: B

Q532. What does a WAF protect against?
A) Network flooding B) Application-layer attacks like SQL injection, XSS, and CSRF by inspecting HTTP traffic C) DDoS at network layer D) Malware on endpoints
Answer: B

Q533. What is the purpose of SPF in email security?
A) Spam filtering B) Specifies which mail servers are authorized to send email for a domain, helping prevent email spoofing C) Encrypts email D) Signs email headers
Answer: B

Q534. What is DKIM?
A) A spam filter B) DomainKeys Identified Mail — adds a cryptographic digital signature to email headers, allowing receivers to verify the email was sent from the legitimate domain C) A DNS record type D) An email protocol
Answer: B

Q535. What is DMARC?
A) An email protocol B) Domain-based Message Authentication, Reporting and Conformance — uses SPF and DKIM to authenticate email and defines policy for handling failures (none, quarantine, reject) C) A firewall feature D) A certificate standard
Answer: B

Q536. What is SSL stripping?
A) Removing SSL certificates B) Downgrading a secure HTTPS connection to HTTP by intercepting the initial unencrypted request, allowing traffic interception C) Breaking SSL encryption D) Removing SSL from servers
Answer: B

Q537. What is a canary token?
A) A bird detection system B) A decoy resource (document, URL, credential) that triggers an alert when accessed, indicating unauthorized access C) An alert rule D) A honeypot
Answer: B

Q538. What is steganography?
A) Hiding servers B) Concealing secret information within ordinary non-secret data (hiding messages in images, audio, video) to avoid detection C) Encryption D) A social engineering technique
Answer: B

Q539. What does CVE stand for?
A) Common Virus Encyclopedia B) Common Vulnerabilities and Exposures — a publicly disclosed list of known cybersecurity vulnerabilities with unique identifiers C) Critical Vulnerability Enumeration D) Cyber Vulnerability Event
Answer: B

Q540. What is CVSS?
A) A scanning tool B) Common Vulnerability Scoring System — a standardized framework for rating the severity of security vulnerabilities (score 0-10) C) A compliance standard D) A threat intel format
Answer: B

Q541. What is a zero trust architecture's core principle?
A) Trust internal networks B) Never trust, always verify — every access request must be authenticated, authorized, and continuously validated regardless of network location C) Trust encrypted traffic D) Trust authenticated users
Answer: B

Q542. What is lateral movement in an attack?
A) Moving files sideways B) Techniques used by attackers to progressively move through a network after initial compromise to reach high-value targets C) Physical movement D) Port movement
Answer: B

Q543. What is the purpose of a DMZ?
A) Military zone B) Network segment hosting public-facing services, isolated from the internal network to limit breach impact C) DNS management zone D) Data management zone
Answer: B

Q544. What is an access control list (ACL)?
A) A user directory B) A list of rules defining which users or systems are permitted or denied access to a resource C) A firewall brand D) A network log
Answer: B

Q545. What does least privilege mean?
A) Minimal pay for users B) Granting only the minimum permissions necessary for a user or process to perform their function C) Low security clearance D) Minimal logging
Answer: B

Q546. What is a security audit?
A) IT review B) A systematic examination of an organization's security controls, policies, and procedures to assess effectiveness and compliance C) A network scan D) A pen test
Answer: B

Q547. What is data masking?
A) Hiding servers B) Replacing sensitive data with realistic but fictitious data for use in non-production environments, protecting real data from exposure C) Encrypting data D) Anonymizing data permanently
Answer: B

Q548. What is tokenization?
A) Creating JWT tokens B) Replacing sensitive data (credit card numbers) with non-sensitive placeholders (tokens) stored in a secure token vault C) Encryption D) Data masking
Answer: B

Q549. What is a security baseline?
A) The minimum acceptable security configuration standard that all systems must meet within an organization C) The first security control D) A network baseline
Answer: A — Note: A is the correct answer here as A gives the right definition.

Q550. What does SOC 2 certify?
A) Product quality B) That a service organization's controls related to security, availability, processing integrity, confidentiality, and privacy are properly designed and operating C) Employee background checks D) Network security only
Answer: B

---

## ROUND TYPE: FILL IN THE BLANK — MIXED ADVANCED

Q551. ________ is a Windows attack technique where an attacker uses a stolen password hash directly to authenticate without knowing the plaintext password.
Answer: Pass-the-Hash (PtH)

Q552. ________ is an attack where a valid Kerberos ticket-granting ticket is forged using the domain controller's KRBTGT hash.
Answer: Golden Ticket attack

Q553. ________ is an attack forging a Kerberos service ticket using a service account's password hash.
Answer: Silver Ticket attack

Q554. ________ is the technique of requesting a Kerberos service ticket for an account and cracking the encrypted ticket offline to recover the service account password.
Answer: Kerberoasting

Q555. ________ is a Windows lateral movement technique executing code on remote systems via WMI or SMB.
Answer: Remote code execution via WMI (or PsExec, Lateral Movement)

Q556. ________ is the process of extracting NTLM hashes from the Windows SAM database or LSASS memory.
Answer: Credential dumping (or LSASS dumping via Mimikatz)

Q557. ________ is a technique where an attacker uses legitimate admin tools and Living-off-the-Land binaries (LOLBins) to avoid detection.
Answer: Living off the Land (LotL)

Q558. ________ is a Windows feature that executes PowerShell commands encoded in Base64, commonly abused by malware to obfuscate malicious commands.
Answer: PowerShell encoded command (-EncodedCommand)

Q559. ________ is an Active Directory attack exploiting misconfigured delegation settings to impersonate any user.
Answer: Unconstrained delegation attack

Q560. ________ is the technique of abusing Active Directory Certificate Services to escalate privileges or forge authentication certificates.
Answer: AD CS abuse (ESC1-ESC8 attack paths)

Q561. ________ is a technique where malware persists by registering itself as a service that starts automatically on boot.
Answer: Service persistence (or registry run key persistence)

Q562. ________ is a Windows attack where an attacker replaces accessibility executables (sticky keys, utilman.exe) with cmd.exe to get a SYSTEM shell from the login screen.
Answer: Sticky keys backdoor (or accessibility feature replacement)

Q563. ________ is a Linux privilege escalation technique exploiting SUID-bit programs to execute code as root.
Answer: SUID exploitation

Q564. ________ is an attack where an attacker intercepts and replays captured authentication credentials.
Answer: Replay attack

Q565. ________ scanning detects services by sending specific probes and analyzing responses — more accurate than port scanning alone.
Answer: Service version (or banner grabbing)

Q566. ________ is a technique used in exploitation where the attacker fills memory with a long sequence of NOP (no operation) instructions before shellcode.
Answer: NOP sled

Q567. ________ is a Python-based Active Directory reconnaissance tool that maps attack paths using graph theory.
Answer: BloodHound (with SharpHound collector)

Q568. ________ is the process of forging ARP replies to associate the attacker's MAC address with a legitimate IP, enabling MITM attacks.
Answer: ARP spoofing (ARP poisoning)

Q569. ________ is a DNS attack technique where the attacker intercepts DNS queries and returns malicious responses without accessing the DNS server.
Answer: DNS spoofing (or DNS injection)

Q570. ________ is a technique where data is hidden in the timing or size of network packets to covertly communicate through a firewall.
Answer: Covert channel (or network steganography)

---

## ROUND TYPE: SCENARIO — ADVANCED

Q571. You are conducting a red team exercise. You have initial access via a phishing email opening a reverse shell on an employee's laptop. Walk through your next steps.
Answer: Post-exploitation follows the MITRE ATT&CK framework. Discovery: enumerate the system (whoami, hostname, ipconfig, net user), identify domain membership, list running processes and security software. Privilege escalation: check for local admin, run privesc enumeration (winPEAS), look for unpatched CVEs, token impersonation, weak service permissions. Credential access: if possible, dump credentials (Mimikatz if AV evades), find saved credentials (browsers, credential manager). Lateral movement: use obtained credentials to access other systems via RDP, SMB, WMI, or PsExec. Persistence: install a scheduled task, registry run key, or WMI subscription for persistence across reboots. C2: establish a more stable C2 channel (HTTPS beaconing to look legitimate). Document every step in the red team report with timestamps, demonstrating the full attack path to the objective.

Q572. Your organization's SIEM shows an alert: excessive Kerberos AS-REQ requests for non-existent usernames from a single IP. What attack is this and how do you respond?
Answer: This is username enumeration via Kerberos Pre-Authentication differences — or potentially the start of a password spraying or AS-REP Roasting attack. Kerberos returns different error codes for valid and invalid usernames, enabling enumeration. Response: block the source IP at the firewall. Investigate what accounts have been enumerated. Check if any accounts have Pre-Authentication disabled (vulnerable to AS-REP Roasting — attacker can request encrypted TGT and crack offline). Review for any successful authentications from that IP. Enable and review Windows Security Event IDs 4768 (TGT request), 4625 (failed logon). Enable Pre-Authentication on all accounts. Implement honeypot accounts that alert when touched.

Q573. You discover that a legitimate software update mechanism is being abused to push malware to 10,000 endpoints across an organization. What is this and how do you respond?
Answer: Supply chain attack via compromised update infrastructure — similar to SolarWinds or NotPetya. Immediate response: immediately halt all software updates from the affected system organization-wide. Isolate the update servers. Determine the scope of distribution — which endpoints received the malicious update, during what time window. Begin investigating when the update mechanism was compromised. Engage threat intelligence — check if this is a known threat actor. For affected endpoints: isolate and forensically image before remediation. Check for persistence, lateral movement, and data exfiltration from affected hosts. Notify relevant authorities. Long-term: implement code signing verification for all updates, monitor update traffic baselines, build a dedicated update security review process.

Q574. A developer reports that the application is returning database error messages visible to end users that include table names. What is the risk and how do you remediate?
Answer: Verbose error disclosure is an information leakage vulnerability. Database error messages reveal: table names (enabling more targeted SQL injection), database type and version (enabling targeted exploits), query structure (aiding injection crafting), and internal architecture. Immediate fix: implement generic error pages for all unhandled exceptions (catch all exceptions and show user-friendly messages). Log detailed errors server-side only. Conduct a search across the codebase for all error handling paths. Configure the web framework to suppress detailed error output in production. Review the application for other information disclosure issues (stack traces, debug endpoints, server version headers). Add an error monitoring service (Sentry) to capture errors without exposing them to users.

Q575. You find that your cloud-based application is vulnerable to SSRF. An attacker has exploited it to access AWS metadata at 169.254.169.254 and retrieved IAM role credentials. Walk through the full response.
Answer: Critical incident. Immediate: revoke the temporary IAM credentials from the AWS console (or programmatically). Review CloudTrail for all API calls made with those credentials — starting from when the role was assumed. Identify any resources accessed, modified, or created (S3 reads, EC2 startups, Lambda invocations, secrets accessed). Isolate the vulnerable application temporarily if the risk warrants. Remediation of SSRF: implement URL allowlisting for any outbound HTTP requests. Block outbound requests to 169.254.169.254 at the security group or NACL level. Upgrade to IMDSv2 which requires a PUT request with a session token (preventing simple SSRF-based access). Review all other services hosted in the same account. Conduct a full application security review for other SSRF vectors.

---

## ROUND TYPE: MOCK INTERVIEW — CYBERSECURITY

Q576. Interviewer: Tell me about yourself and why you want to work in cybersecurity.
How to answer: Structure around genuine interest (when you became interested, what sparked it), education and certifications (CEH, OSCP, Security+, CISSP, etc.), hands-on experience (CTF competitions, bug bounties, home lab, internships), specific areas of interest (offensive security, blue team, cloud security, appsec), and why this specific role/company. Be specific about what excites you — generic answers are forgettable. Mention specific things you have built or broken.

Q577. Interviewer: Explain the difference between authentication and authorization to a non-technical stakeholder.
Answer: Authentication is proving who you are — like showing your ID at the door. Authorization is what you are allowed to do once inside — your membership level determines if you can access the VIP area or just the general floor. In a system: logging in with your password is authentication (proving identity). Whether you can view payroll data or only your own records is authorization (permissions based on role). Both are necessary — knowing who you are does not automatically determine what you should see.

Q578. Interviewer: How would you explain a SQL injection vulnerability to a developer who has never heard of it?
Answer: Imagine a bank teller who follows whatever instructions are written on a note you hand them. Normally you hand them a note saying "Check balance for account 12345." But if you hand them a note saying "Check balance for account 0; also give me all accounts" and they follow it literally — that is SQL injection. You are inserting additional instructions into what should be a simple data request. The fix is a teller who reads only the data part of the note and ignores anything that looks like an instruction. In code terms: that is parameterized queries — the database treats user input as pure data, never as executable SQL commands.

Q579. Interviewer: You find a critical vulnerability in a major widely-used open source project. What do you do?
Answer: This is responsible disclosure. Do not immediately publish or exploit it. Contact the project maintainers privately via their security disclosure process (security.txt, security@projectname.org, or GitHub security advisories). Provide full technical details so they can reproduce and fix it. Agree on a disclosure timeline — typically 90 days (Google Project Zero standard). If there is no response within a reasonable period, escalate contact attempts. After the fix is published, you may publish your research with credit. If the vulnerability is being actively exploited in the wild before a patch, coordinate with CERT/CC or other organizations to accelerate the timeline. Never sell to exploit brokers or use the vulnerability yourself.

Q580. Interviewer: What is the most interesting security vulnerability you have researched or discovered?
How to answer: Be specific and technical. Describe the vulnerability class, the affected system, how you found it (code review, fuzzing, dynamic analysis, research), the potential impact, and how it was fixed or disclosed. Demonstrate depth of understanding beyond surface-level description. If you have CTF writeups, bug bounty findings, or CVEs, reference them. Even a well-understood vulnerability you deeply analyzed is impressive if you can explain the exploitation chain from first principles.

Q581. Interviewer: How do you stay current with cybersecurity threats and techniques?
Answer: Reading threat intelligence reports from vendors (Mandiant, CrowdStrike, Recorded Future), CVE databases (NVD, MITRE). Following security researchers on social media and reading their blogs. Participating in CTF competitions to practice hands-on skills. Reading conference talks and papers from DEF CON, Black Hat, USENIX Security. Practicing on platforms like HackTheBox, TryHackMe, PentesterLab. Bug bounty programs for real-world experience. Subscribing to CISA advisories and US-CERT. Participating in security communities (r/netsec, Twitter/X security community). Reading books — The Web Application Hacker's Handbook, The Hacker Playbook, Art of Exploitation.

Q582. Interviewer: Describe your process for responding to a security alert from a SIEM.
Answer: Structured triage process. Step 1 — validate the alert: is it a known false positive pattern? Has this fired before for legitimate activity? Step 2 — gather context: what host, user, process, network connection triggered it? What happened before and after? Step 3 — enrich the data: look up IPs in threat intel feeds, check the user's normal behavior baseline, review related events. Step 4 — determine severity: is this a true positive? What is the potential impact? Is this ongoing? Step 5 — contain if needed: if confirmed malicious, follow the relevant playbook. Step 6 — document: record timeline, evidence, actions taken. Step 7 — escalate: determine if it requires higher-tier analyst or incident response.

Q583. Interviewer: How would you test if a web application is vulnerable to SQL injection without using automated tools?
Answer: Manual testing for SQL injection. Start with single quote in input fields: ' — observe if the application returns a database error, changes behavior, or returns unexpected data. Try -- (comment syntax) to comment out query logic: admin'-- in username field. Test boolean-based blind: value' AND 1=1-- (page loads normally) vs value' AND 1=2-- (different response indicates injection). Test time-based blind: value'; WAITFOR DELAY '0:0:5'-- (SQL Server) — if page delays 5 seconds, injection confirmed. Try UNION-based injection to extract data: ' UNION SELECT null,null-- incrementing nulls until column count matches. Test all input vectors: GET/POST parameters, headers (User-Agent, X-Forwarded-For), cookies.

Q584. Interviewer: What is your approach to securing an API?
Answer: Defense in depth for APIs. Authentication: require strong authentication (OAuth 2.0, API keys, JWT) — never allow unauthenticated access to sensitive endpoints. Authorization: implement and test authorization on every endpoint — verify users can only access their own resources (IDOR prevention). Input validation: validate all input parameters — type, format, range, size. Rate limiting: prevent brute force and abuse with per-client rate limits. TLS: require HTTPS only, TLS 1.2+, HSTS. Sensitive data: never expose unnecessary data in responses (filter fields), never return sensitive data in URLs. Logging: log all API requests with user identity, timestamp, endpoint. Error handling: return generic error messages. API versioning security: deprecate and monitor old API versions. Regular security testing: DAST and manual pen testing. Use an API gateway for centralized enforcement.

Q585. Interviewer: Explain how Kerberos authentication works.
Answer: Kerberos is a ticket-based authentication protocol used in Active Directory. Three parties: the client, the Key Distribution Center (KDC, typically the domain controller), and the service. Step 1 — AS Exchange: client sends username to KDC Authentication Service (AS). KDC verifies and returns a Ticket Granting Ticket (TGT) encrypted with the client's password hash and a session key. Step 2 — TGS Exchange: client presents TGT to the KDC Ticket Granting Service (TGS) and requests a Service Ticket for a specific service. TGS verifies TGT and returns a Service Ticket encrypted with the service's secret key. Step 3 — Service Authentication: client presents Service Ticket to the target service. Service decrypts with its own key, verifies, and grants access. The client's password never travels the network — only encrypted tickets. This is why Pass-the-Hash, Kerberoasting, and Golden/Silver Ticket attacks target the Kerberos process.

Q586. Interviewer: What is the difference between a pentest and a red team engagement?
Answer: A penetration test focuses on finding as many vulnerabilities as possible within a defined scope and time — comprehensive breadth. It typically tests specific systems, applications, or network segments. The blue team (defenders) usually knows a test is happening. Deliverable: detailed vulnerability report with severity ratings and remediation guidance. A red team engagement simulates a real adversary pursuing a specific objective (steal intellectual property, achieve domain admin, compromise a specific server). It is covert — the blue team does not know it is happening, so their detection and response capabilities are also tested. It uses attacker TTPs, remains stealthy, and tests people, processes, and technology holistically. Deliverable: a narrative of the attack path, gaps in detection and response, and strategic security recommendations.

Q587. Interviewer: You are hired as the first security engineer at a 100-person startup. What do you do in your first 90 days?
Answer: Day 1-30 — Discovery and assessment: understand the business, the tech stack, existing controls (or lack of), compliance requirements, and risk appetite. Interview engineering, DevOps, and leadership. Inventory systems, data, and vendors. Identify the highest risks. Days 30-60 — Quick wins: enable MFA everywhere, implement password manager policy, activate SSO, enable cloud security posture management (CSPM) on cloud accounts, enable audit logging, patch critical vulnerabilities, basic security awareness training, implement secrets scanning in repositories. Days 60-90 — Foundation building: implement a vulnerability management process, security in CI/CD pipeline (SAST, dependency scanning), incident response plan draft, security training program, prioritized security roadmap for the next 12 months. Communicate with leadership about risk posture.

Q588. Interviewer: How do you prioritize vulnerabilities when you have hundreds to remediate?
Answer: Risk-based prioritization rather than CVSS score alone — CVSS measures technical severity but not business context. Framework: Exploitability — is there a public exploit? Is it being actively exploited in the wild (CISA KEV catalog)? Exposure — is the vulnerable system internet-facing or internal? Business impact — what would compromise of this system mean? Data sensitivity — does it handle PII, payment data, credentials? Compensating controls — are there other controls reducing likelihood or impact? Remediation effort — quick fixes first to reduce risk rapidly. Priority 1: critical/high CVSS with public exploits, internet-facing systems. Priority 2: critical/high CVSS on internal systems. Priority 3: medium severity across the board. Priority 4: low severity, accepted risk, or compensating controls in place. Use a vulnerability management platform (Tenable, Qualys) to track and assign SLAs.

Q589. Interviewer: What would you do if you discovered your company was actively being attacked right now?
Answer: Remain calm, act decisively. Immediately notify the security team lead and CISO. Activate the incident response plan. Parallel tracks: Containment — isolate affected systems to prevent spread (network isolation, not shutdown to preserve forensic evidence). Evidence preservation — capture memory, logs, and network traffic before they are lost. Communication — establish an out-of-band communication channel (attackers may be monitoring internal systems), notify legal and executive leadership. Assessment — understand the scope: what systems are affected, what data may be compromised, what is the attack vector. External help — engage IR retainer (Mandiant, CrowdStrike) if the attack is beyond internal capabilities. Legal/regulatory — determine breach notification obligations. Do not disclose publicly until you have facts and legal counsel has reviewed.

Q590. Interviewer: Last question — what is one area of cybersecurity you are most excited about right now and why?
How to answer: Be authentic and specific. Strong options: AI/ML security — both using AI to defend and attacks against AI systems (prompt injection, model poisoning); supply chain security — SBOMs, sigstore, provenance attestation; post-quantum cryptography — migrating to quantum-resistant algorithms before quantum computers break RSA/ECC; passkeys and the death of passwords; offensive security research — kernel exploitation, browser pwn; cloud-native security — securing ephemeral, containerized, serverless architectures; LLM security — prompt injection, jailbreaking, AI agent attack surfaces. Show genuine intellectual curiosity, mention specific research you have read or techniques you have practiced.

---

## ROUND TYPE: FILL IN THE BLANK — FINAL RAPID FIRE

Q591. ________ is a vulnerability where the application trusts attacker-controlled data included in a serialized object, enabling remote code execution.
Answer: Insecure deserialization

Q592. ________ is an attack where an attacker abuses a web application's password reset flow to take over an account.
Answer: Account takeover via password reset (or host header injection in password reset)

Q593. ________ is a technique for bypassing web application firewalls using non-standard encoding or syntax variations.
Answer: WAF evasion

Q594. ________ is a Linux command that shows all listening ports and their associated processes.
Answer: ss -tlnp (or netstat -tlnp)

Q595. ________ is a Windows command showing all active network connections and listening ports.
Answer: netstat -ano

Q596. ________ is a tool used for capturing and analyzing network packets in real time.
Answer: Wireshark (or tcpdump)

Q597. ________ is a web security vulnerability arising when HTTP/2 and HTTP/1.1 connections are handled inconsistently by front-end and back-end servers.
Answer: HTTP Request Smuggling (or Desync attack)

Q598. ________ is the technique of using an attacker-controlled URL in a server-side template to execute code.
Answer: Server-Side Template Injection (SSTI)

Q599. ________ is a vulnerability where a race condition between checking and using a resource allows an attacker to manipulate it in between.
Answer: Time-of-Check to Time-of-Use (TOCTOU) race condition

Q600. ________ is an attack that exploits HTTP redirects or meta refreshes to send users to a malicious site.
Answer: Open redirect

Q601. ________ is the practice of using multiple security layers so that the failure of one control does not result in a complete breach.
Answer: Defense in depth

Q602. ________ is a network security control that inspects decrypted HTTPS traffic for malware and policy violations.
Answer: TLS/SSL inspection (or SSL decryption)

Q603. ________ is the process of verifying that the software you received is exactly what the developer released, using checksums and signatures.
Answer: Software integrity verification (or code signing verification)

Q604. ________ is a mechanism where browsers automatically upgrade HTTP requests to HTTPS if the server has previously declared HSTS.
Answer: HSTS (HTTP Strict Transport Security)

Q605. ________ is an attack exploiting Unicode normalization to bypass input validation filters using homoglyph characters.
Answer: Unicode normalization attack (or homograph attack)

Q606. ________ is a Python framework for offensive security including exploit development, post-exploitation, and C2.
Answer: Cobalt Strike (commercial) / Metasploit (open source) / Pwntools (for exploit development)

Q607. ________ is the process of analyzing malware without executing it, using disassemblers and decompilers.
Answer: Static malware analysis

Q608. ________ is the process of executing malware in a controlled environment to observe its behavior.
Answer: Dynamic malware analysis (or sandbox analysis)

Q609. ________ is a sandbox environment commonly used for malware analysis.
Answer: Any.run, Cuckoo Sandbox, Joe Sandbox

Q610. ________ is the standard disassembler and reverse engineering tool widely used for malware analysis.
Answer: IDA Pro (or Ghidra — free NSA tool)

Q611. ________ is a type of attack where the attacker manipulates the logic of an application rather than exploiting a technical vulnerability.
Answer: Business logic vulnerability (or logic flaw)

Q612. ________ is the term for the first host an attacker compromises in a network to use as a launchpad for further attacks.
Answer: Beachhead (or initial access point)

Q613. ________ is a security model where applications run in isolated compartments with minimal permissions, limiting breach impact.
Answer: Sandboxing (or application containment)

Q614. ________ is the practice of tracking and managing all software assets in an organization to maintain visibility and control.
Answer: Software Asset Management (SAM) or asset inventory

Q615. ________ is a protocol for securely managing network devices using an encrypted channel, replacing Telnet.
Answer: SSH (Secure Shell)

Q616. ________ is a network protocol vulnerability that allows session hijacking by predicting the initial sequence number of TCP connections.
Answer: TCP session hijacking (or ISN prediction)

Q617. ________ is the technique of hiding malicious code inside a legitimate document (PDF, Word) to execute upon opening.
Answer: Malicious document (maldoc) attack or document-based exploit

Q618. ________ testing checks that a fixed vulnerability has not been re-introduced by subsequent code changes.
Answer: Regression testing (security regression testing)

Q619. ________ is the process of removing all traces of attacker activity from compromised systems during incident response.
Answer: Eradication

Q620. ________ is a cybersecurity framework published by MITRE describing adversary tactics and techniques at the pre-compromise stage.
Answer: MITRE PRE-ATT&CK (or MITRE ATT&CK for Enterprise initial access tactics)

Q621. ________ is a technique where malware overwrites the Master Boot Record to gain control before the OS loads.
Answer: Bootkit (or MBR rootkit)

Q622. ________ is an attack that exploits the trust relationship between a subdomain and its parent domain to steal cookies.
Answer: Subdomain takeover (when the subdomain points to an expired third-party service)

Q623. ________ is the security principle that no single individual should have complete control over a critical process.
Answer: Separation of duties (or dual control)

Q624. ________ is the security principle requiring two people to be present to perform critical operations (like launching nuclear weapons or accessing the root CA private key).
Answer: Two-person integrity (or dual authorization)

Q625. ________ is a security control requiring users to re-authenticate before performing sensitive operations even within an active session.
Answer: Step-up authentication (or re-authentication for sensitive actions)

Q626. ________ is the exploitation of trust relationships in Active Directory forests to move between domains.
Answer: Cross-domain trust exploitation (or inter-forest attack)

Q627. ________ is a Windows attack technique obtaining Domain Admin by compromising a computer account trusted for unconstrained delegation.
Answer: Unconstrained delegation abuse

Q628. ________ is a post-exploitation technique maintaining long-term persistent access via a compromised domain controller by writing to ntds.dit.
Answer: DCShadow (or DCSync for credential extraction)

Q629. ________ is a vulnerability class in parsers where two systems interpret the same input differently, enabling smuggling or injection attacks.
Answer: Differential parsing (or parser confusion)

Q630. ________ is an attack targeting the 802.1X authentication process to gain unauthorized network access.
Answer: 802.1X bypass (or RADIUS authentication attack)

Q631. ________ is the process of converting captured network traffic into a readable format for analysis.
Answer: Packet decoding (or protocol dissection)

Q632. ________ is a cloud attack technique where an attacker abuses overly permissive IAM permissions to escalate from a low-privilege to a high-privilege role.
Answer: IAM privilege escalation (cloud)

Q633. ________ is a security testing technique where testers simulate attacks against a system that is currently running in production with full operational team awareness.
Answer: Purple team exercise (red and blue team working together)

Q634. ________ is the security property ensuring that data is accessible to authorized users when needed.
Answer: Availability

Q635. ________ is the security property ensuring that data has not been altered without authorization.
Answer: Integrity

Q636. ________ is the security property ensuring data is accessible only to those authorized to access it.
Answer: Confidentiality

Q637. The CIA triad stands for ________, ________, and ________.
Answer: Confidentiality, Integrity, Availability

Q638. ________ is the most important skill for a cybersecurity professional beyond technical knowledge.
Answer: Adversarial thinking — the ability to think like an attacker, anticipate how systems will be abused, and apply technical knowledge to real-world threat contexts. Combined with clear communication to translate technical risks into business language for decision-makers.

Q639. ________ is a critical vulnerability discovered in 2021 affecting Apache Log4j, rated CVSS 10.0, enabling unauthenticated remote code execution.
Answer: Log4Shell (CVE-2021-44228)

Q640. What is the most important question to ask at the start of any security engagement?
Answer: "What are we trying to protect, and what would be the worst thing that could happen?" — Understanding the crown jewels (most valuable assets) and the threat model (who would attack and why) is the foundation of all security work. Without this, you are securing everything equally which means effectively securing nothing. Every security control, investment, and priority flows from answering this question clearly.

---

**Total: 640 Cybersecurity Interview Questions and Answers**

Topics covered: Networking Fundamentals, Cryptography, Web Application Security, Network Security, OS and Host Security, Malware and Threats, Identity and Access Management, Social Engineering, Penetration Testing, Incident Response and Forensics, Cloud Security, Application Security, Security Operations, Compliance and Governance, Advanced Topics, Wireless Security, Mobile Security, Physical Security, Encryption and PKI Advanced, Threat Actors — across Concept MCQ, Fill in the Blank, Scenario, Architecture/System Design, Coding, Mock Interview, and Rapid Fire round types.

You're right. Here are Q336–Q500, completing the topic-wise section:

---

Q336. What is a nation-state threat actor?
Answer: A government-sponsored hacking group conducting cyber operations for geopolitical objectives — espionage, sabotage, election interference, and intellectual property theft. Examples: APT28 (Russia/GRU), APT41 (China/MSS), Lazarus Group (North Korea). They have significant resources, zero-days, and custom malware unavailable to criminal groups.

Q337. What is the difference between a threat actor and a threat vector?
Answer: A threat actor is the who — the person or group conducting the attack (nation-state, cybercriminal, insider). A threat vector is the how — the path or method used to gain access (phishing email, unpatched vulnerability, stolen credentials, malicious USB). One actor can use many vectors.

Q338. What is a script kiddie?
Answer: An unskilled attacker who uses existing tools, exploit kits, and scripts written by others without understanding the underlying techniques. They typically target easy, widely-known vulnerabilities and represent a significant proportion of low-level attacks due to the accessibility of off-the-shelf tools.

Q339. What is hacktivism?
Answer: Conducting cyberattacks for political, social, or ideological motivations rather than financial gain. Techniques include DDoS attacks against government sites, website defacement, and data leaks. Groups like Anonymous and Killnet operate under this model. Attribution is often intentional and public, unlike espionage actors who prefer anonymity.

Q340. What is a cybercrime syndicate?
Answer: An organized criminal group operating as a business to conduct cyberattacks for financial profit — ransomware deployment, fraud, credential theft, and money laundering. They operate with business-like structure including HR, developers, negotiators, and money mules. Groups like Conti, LockBit, and FIN7 are well-documented examples.

---

TOPIC 21: WIRELESS AND PROTOCOL SECURITY — FILL IN THE BLANK

Q341. ________ is the protocol used by WPA2-Enterprise for authenticating wireless clients using certificates or credentials against a RADIUS server.
Answer: 802.1X (EAP — Extensible Authentication Protocol)

Q342. ________ is a wireless attack capturing the WPA2 four-way handshake and cracking the PSK offline using a dictionary.
Answer: WPA2 handshake capture and offline cracking (using aircrack-ng or hashcat)

Q343. ________ is a Bluetooth attack allowing unauthorized reading and writing of data from a Bluetooth-enabled device without pairing.
Answer: BlueSnarfing (reading) / BlueJacking (sending unsolicited messages)

Q344. ________ is the Bluetooth attack exploiting a vulnerability to take full control of a device without user interaction.
Answer: BlueBorne

Q345. ________ is a rogue base station that impersonates a legitimate cellular tower to intercept mobile communications.
Answer: IMSI catcher (or Stingray)

---

TOPIC 22: VULNERABILITY MANAGEMENT — CONCEPT MCQ

Q346. What is a vulnerability?
A) A threat B) A weakness in a system that could be exploited by a threat actor to cause harm C) An attack D) A risk
Answer: B — Vulnerability × Threat = Risk.

Q347. What is patch management?
A) Sewing software B) The process of acquiring, testing, and deploying software updates that fix vulnerabilities and bugs in a controlled and timely manner C) Software licensing D) Version control
Answer: B — Unpatched vulnerabilities are the leading cause of successful breaches.

Q348. What is a vulnerability scanner?
A) A firewall B) An automated tool that probes systems and applications for known vulnerabilities by comparing configurations and software versions against vulnerability databases C) A SIEM D) A password cracker
Answer: B — Examples: Nessus, Qualys, OpenVAS, Rapid7 InsightVM.

Q349. What is a CVSS score and what does a score of 10.0 mean?
A) A network metric B) Common Vulnerability Scoring System score measuring severity 0-10. A score of 10.0 is the maximum — a critical vulnerability that is remotely exploitable, requires no authentication, and has catastrophic impact C) A compliance score D) A risk score
Answer: B — CVSS 9.0-10.0 = Critical, 7.0-8.9 = High, 4.0-6.9 = Medium, 0.1-3.9 = Low.

Q350. What is the difference between a vulnerability and an exploit?
A) No difference B) A vulnerability is the weakness; an exploit is the specific code or technique that takes advantage of that weakness to cause harm C) An exploit is theoretical D) A vulnerability is always exploited
Answer: B — Many vulnerabilities exist but are only dangerous when paired with an exploit.

Q351. What is a zero-day exploit?
A) An exploit for a patched vulnerability B) An exploit targeting a zero-day vulnerability — one that is unknown to the vendor with no patch available C) An old exploit D) A slow exploit
Answer: B — Zero-day exploits command extremely high prices on both legal (government) and illegal markets.

Q352. What is the National Vulnerability Database (NVD)?
A) A vendor security portal B) A US government repository of CVE vulnerability data enriched with CVSS scores, remediation guidance, and related references C) A compliance database D) A threat feed
Answer: B — The NVD is maintained by NIST and is the authoritative public vulnerability database.

Q353. What is the CISA Known Exploited Vulnerabilities (KEV) catalog?
A) A list of theoretical risks B) A CISA-maintained catalog of vulnerabilities confirmed to be actively exploited in the wild, with mandatory remediation deadlines for federal agencies and guidance for all organizations C) An academic list D) A vendor advisory
Answer: B — The KEV catalog is the highest-priority remediation list available.

Q354. What is vulnerability prioritization?
A) Alphabetical sorting B) Determining remediation order based on exploitability, exposure, business impact, and availability of exploits — not just CVSS score alone C) Fixing the most recent first D) Fixing cheapest first
Answer: B — Risk-based prioritization focuses resources where they have the greatest security impact.

Q355. What is an attack surface?
A) A physical target B) The total sum of all points where an attacker could try to enter or extract data from an environment — every interface, service, port, API, and human entry point C) The network perimeter D) Internet-facing systems only
Answer: B — Reducing attack surface is a fundamental security strategy.

---

TOPIC 22: VULNERABILITY MANAGEMENT — FILL IN THE BLANK

Q356. ________ is the process of actively searching for and identifying vulnerabilities in systems before attackers discover them.
Answer: Vulnerability assessment

Q357. ________ is a vulnerability in Microsoft Exchange Server exploited in 2021 by multiple threat actors to compromise mail servers worldwide.
Answer: ProxyLogon (CVE-2021-26855)

Q358. ________ is a NIST publication providing a framework for vulnerability management programs.
Answer: NIST SP 800-40

Q359. ________ is the practice of verifying that a vulnerability has been successfully remediated after patching.
Answer: Remediation verification (or patch validation)

Q360. ________ is a vulnerability management metric measuring the average time between vulnerability discovery and patching.
Answer: Mean Time to Patch (MTTP) or Mean Time to Remediate (MTTR)

---

TOPIC 23: ACTIVE DIRECTORY SECURITY — CONCEPT MCQ

Q361. What is Active Directory (AD)?
A) A file storage system B) Microsoft's directory service for Windows domain environments — centrally managing users, computers, groups, and policies C) An email server D) A database
Answer: B — AD is the backbone of most enterprise Windows environments and a prime attacker target.

Q362. What is a domain controller?
A) A network switch B) A server running Active Directory Domain Services, responsible for authenticating users, enforcing policies, and replicating directory data C) A firewall D) A DHCP server
Answer: B — Compromising a domain controller typically means full control of the environment.

Q363. What is Group Policy?
A) A meeting policy B) A Windows feature allowing administrators to define and enforce configuration settings across all computers and users in an AD domain centrally C) A firewall rule D) An email policy
Answer: B — Group Policy Objects (GPOs) control security settings, software deployment, and user environments.

Q364. What is an NTLM hash?
A) A file hash B) The cryptographic representation of a Windows user's password used for authentication in legacy Windows environments C) A network token D) An encryption key
Answer: B — NTLM hashes can be used in Pass-the-Hash attacks or cracked offline.

Q365. What is a Service Principal Name (SPN)?
A) A server hostname B) A unique identifier for a service instance in Active Directory, used by Kerberos to associate a service with a service account — the target of Kerberoasting C) A domain name D) A user account
Answer: B — Accounts with SPNs set are targetable via Kerberoasting.

Q366. What is DCSync?
A) A DC backup process B) A technique using AD replication APIs to pull password hashes from a domain controller without running code on it — requires Replicating Directory Changes permissions C) A Group Policy sync D) A DNS sync
Answer: B — Tools like Mimikatz implement DCSync. It is used for credential theft post-compromise.

Q367. What is the SYSVOL share?
A) A system backup B) A shared folder on every domain controller containing Group Policy objects and logon scripts, readable by all authenticated domain users C) A system log D) A user profile share
Answer: B — SYSVOL historically stored GPP credentials in plaintext — a well-known attack vector.

Q368. What is an AS-REP Roasting attack?
A) A password spray B) Targeting AD accounts with Pre-Authentication disabled — attackers request an AS-REP, receive an encrypted TGT, and crack it offline to recover the account password C) A MITM attack D) A replay attack
Answer: B — Accounts without Pre-Authentication should not exist in production environments.

Q369. What is BloodHound used for?
A) Malware analysis B) Visualizing Active Directory attack paths using graph theory to identify the shortest path to Domain Admin from any compromised account C) A password cracker D) A network scanner
Answer: B — BloodHound is widely used by both attackers and defenders for AD security analysis.

Q370. What does it mean to "own" a domain in a penetration test?
A) Register the domain B) Achieve Domain Admin or equivalent privileges — full control over all systems, users, and resources in the Active Directory domain C) Access the web server D) Read the domain's emails
Answer: B — Domain Admin is the typical end goal of an AD-focused penetration test.

---

TOPIC 23: ACTIVE DIRECTORY SECURITY — FILL IN THE BLANK

Q371. ________ is a Windows authentication protocol that provides mutual authentication and is more secure than NTLM.
Answer: Kerberos

Q372. ________ is a collection of tools for credential extraction, Pass-the-Hash, Golden/Silver Ticket attacks, and Kerberoasting.
Answer: Mimikatz

Q373. ________ is the default administrator account in Active Directory with UID 500, a high-value target for attackers.
Answer: Administrator (RID 500)

Q374. ________ is a built-in AD group whose members have unrestricted access to all domain controllers and AD data.
Answer: Domain Admins

Q375. ________ is a technique abusing Active Directory Certificate Services to forge certificates for arbitrary users, including Domain Admins.
Answer: ESC1 (or AD CS abuse — certificate template misconfiguration)

---

TOPIC 24: ENCRYPTION PROTOCOLS IN DEPTH — FILL IN THE BLANK

Q376. TLS ________ removed all deprecated cipher suites and made forward secrecy mandatory, using only AEAD ciphers.
Answer: 1.3

Q377. ________ is a TLS attack exploiting CBC mode padding validation responses to decrypt ciphertext byte by byte.
Answer: POODLE (or CBC padding oracle attack)

Q378. ________ is a TLS vulnerability allowing an attacker to force negotiation of export-grade 512-bit RSA keys.
Answer: FREAK (or EXPORT cipher downgrade)

Q379. ________ is a Diffie-Hellman downgrade attack exploiting weak DH parameters to perform MITM on TLS connections.
Answer: Logjam

Q380. ________ is a TLS renegotiation vulnerability allowing an attacker to inject plaintext into an existing TLS session.
Answer: CVE-2009-3555 (TLS renegotiation vulnerability)

---

TOPIC 25: CONTAINER AND KUBERNETES SECURITY — CONCEPT MCQ

Q381. What is a container escape?
A) Exiting a Docker command B) Breaking out of a container's isolation boundary to access the underlying host system, often via kernel vulnerabilities or misconfigurations C) Stopping a container D) A container crash
Answer: B — Container escapes are critical vulnerabilities that undermine containerization security.

Q382. What is a privileged container?
A) An admin container B) A container running with all Linux capabilities and access to host devices, effectively removing container isolation — a significant security risk C) An encrypted container D) A root container
Answer: B — Never run privileged containers in production unless absolutely necessary and unavoidable.

Q383. What is a Kubernetes Network Policy?
A) A load balancer rule B) A Kubernetes resource specifying how pods are allowed to communicate with each other and with external endpoints, implementing micro-segmentation C) A firewall device D) A DNS policy
Answer: B — Without Network Policies, all pods in a cluster can communicate freely — no segmentation.

Q384. What is the Kubernetes API server?
A) A web server B) The central control plane component for Kubernetes — all cluster operations go through it. Unauthorized access to the API server means full cluster control C) A database D) A networking component
Answer: B — The API server should be restricted by RBAC, network policies, and audit logging.

Q385. What is a pod security admission (PSA) in Kubernetes?
A) A network policy B) A Kubernetes admission controller enforcing security standards on pod specifications — restricting privileged containers, host namespaces, and capability usage C) A storage policy D) An RBAC rule
Answer: B — PSA replaced the deprecated PodSecurityPolicy in Kubernetes 1.25+.

Q386. What is image scanning in container security?
A) Screenshot scanning B) Analyzing container images for known vulnerable software packages, exposed secrets, and insecure configurations before deployment C) Network scanning D) Log scanning
Answer: B — Tools: Trivy, Snyk, Clair, Grype. Integrated into CI/CD pipelines.

Q387. What is runtime container security?
A) Container speed optimization B) Monitoring and protecting containers while they are running — detecting anomalous behavior, unexpected system calls, and policy violations in real time C) Container logging D) Container networking
Answer: B — Tools: Falco (syscall monitoring), Sysdig, Aqua Security.

---

TOPIC 25: CONTAINER SECURITY — FILL IN THE BLANK

Q388. ________ is a Kubernetes vulnerability where a container can access the host's PID namespace, enabling it to see and potentially kill host processes.
Answer: hostPID privilege escalation

Q389. ________ is the principle of using the smallest possible container base image to minimize the attack surface.
Answer: Minimal base image (or distroless containers)

Q390. ________ is a Kubernetes security tool that audits cluster configurations against CIS Kubernetes Benchmark.
Answer: kube-bench

---

TOPIC 26: DEVSECOPS AND CI/CD SECURITY — CONCEPT MCQ

Q391. What is a software supply chain attack?
A) Attacking a warehouse B) Compromising a component in the software supply chain — open source libraries, build tools, CI/CD pipelines, or package registries — to inject malicious code into downstream products C) Attacking delivery trucks D) A logistics hack
Answer: B — Examples: SolarWinds Orion, event-stream npm package, XZ Utils backdoor.

Q392. What is dependency confusion?
A) Too many libraries B) An attack where a malicious package with the same name as an internal private package is published to a public registry, causing build tools to download the malicious version C) A version conflict D) A circular dependency
Answer: B — Exploited by Alex Birsan in 2021 to compromise Apple, Microsoft, and Uber.

Q393. What is code signing?
A) Commenting code B) Cryptographically signing software artifacts (executables, packages, container images) with a private key so consumers can verify authenticity and integrity C) A code review D) Version control
Answer: B — Code signing prevents tampering in the supply chain. Tools: Sigstore, GPG, Authenticode.

Q394. What is Sigstore?
A) A signature database B) An open-source project providing free tools for code signing, verification, and transparency logging — making it easy to sign and verify software artifacts C) A code repository D) A vulnerability scanner
Answer: B — Sigstore includes Cosign (container signing), Fulcio (CA), and Rekor (transparency log).

Q395. What is a software artifact?
A) A historical software B) Any file produced by the build process — compiled binaries, container images, packages, or checksums — that flows through the supply chain C) Source code D) Documentation
Answer: B — Securing artifacts (signing, provenance, integrity verification) is core to supply chain security.

---

TOPIC 26: DEVSECOPS — FILL IN THE BLANK

Q396. ________ is the practice of running automated security tests on every pull request before merging code.
Answer: Security in CI pipeline (or PR-gated security scanning)

Q397. ________ is a file that documents the security posture, intended use, and limitations of a software component.
Answer: Security advisory (or SECURITY.md)

Q398. ________ is a standard format for communicating security advisories for open source software.
Answer: OSV (Open Source Vulnerability) format or GitHub Advisory Database

Q399. ________ is the practice of requiring multiple reviewers to approve code before it can merge, preventing a single compromised developer from introducing malicious code.
Answer: Mandatory code review (or multi-party authorization)

Q400. ________ is an in-toto framework concept providing a verifiable record of every step in the software supply chain.
Answer: Provenance (or SLSA — Supply-chain Levels for Software Artifacts)

---

TOPIC 27: DATA SECURITY AND PRIVACY — CONCEPT MCQ

Q401. What is data loss prevention (DLP)?
A) Data backup B) Technology and processes that detect and prevent unauthorized transmission of sensitive data outside the organization — via email, USB, cloud upload, or printing C) Encryption D) Data classification
Answer: B — DLP tools inspect content for PII, payment data, credentials, and IP.

Q402. What is personally identifiable information (PII)?
A) Any business data B) Any information that can identify a specific individual — name, SSN, email, address, biometrics, IP address — subject to privacy regulations C) Public data D) Encrypted data
Answer: B — PII handling is governed by GDPR, CCPA, HIPAA, and other regulations.

Q403. What is data anonymization?
A) Data encryption B) Irreversibly transforming data so that individuals cannot be identified — removing or transforming all identifiers so re-identification is not possible C) Data masking D) Data tokenization
Answer: B — True anonymization means GDPR no longer applies. Pseudonymization still falls under GDPR.

Q404. What is the right to erasure (right to be forgotten)?
A) A password reset right B) A GDPR right allowing individuals to request deletion of their personal data when it is no longer necessary, consent is withdrawn, or processing is unlawful C) A security right D) An audit right
Answer: B — Right to erasure requires organizations to delete data from all systems including backups.

Q405. What is a data protection officer (DPO)?
A) A security guard B) A mandatory role under GDPR for organizations processing personal data at scale — responsible for ensuring compliance with data protection laws C) A CISO D) A compliance auditor
Answer: B — The DPO must have expert knowledge of data protection law and be independent.

Q406. What is data minimization?
A) Deleting all data B) The principle of collecting and retaining only the minimum data necessary for the specified purpose — a core GDPR principle C) Data compression D) Data encryption
Answer: B — Data minimization reduces breach impact and regulatory liability.

Q407. What is a data retention policy?
A) A backup policy B) A documented policy specifying how long different categories of data are retained and when they must be securely deleted C) A data classification D) An access policy
Answer: B — Retaining data longer than necessary increases breach impact and regulatory risk.

Q408. What is a privacy impact assessment (PIA)?
A) A security audit B) A process for identifying and evaluating privacy risks before implementing a new system, process, or technology that handles personal data C) A compliance report D) A risk assessment
Answer: B — PIAs are required by GDPR (called DPIAs — Data Protection Impact Assessments) for high-risk processing.

---

TOPIC 27: DATA SECURITY — FILL IN THE BLANK

Q409. ________ is the California Consumer Privacy Act — giving California residents rights over their personal data similar to GDPR.
Answer: CCPA

Q410. ________ is the practice of replacing real data with realistic synthetic data for use in development and testing environments.
Answer: Data masking (or synthetic data generation)

Q411. ________ is a legal process requiring an organization to preserve data that may be relevant to anticipated or ongoing litigation.
Answer: Legal hold (or litigation hold)

Q412. ________ is the concept that data must be protected and governed according to the laws of the country where it is stored.
Answer: Data sovereignty (or data residency)

Q413. ________ is a GDPR requirement to report personal data breaches to the supervisory authority within ________ hours of becoming aware of them.
Answer: 72 hours

---

TOPIC 28: SECURITY ARCHITECTURE — CONCEPT MCQ

Q414. What is defense in depth?
A) Deep firewalls B) A security strategy using multiple layered security controls so that if one fails, others remain to protect the asset C) Deep packet inspection D) Underground data centers
Answer: B — No single control is 100% effective. Layers of different control types are essential.

Q415. What are the three types of security controls?
A) Hardware, software, firmware B) Preventive (stop attacks), Detective (identify attacks), Corrective (recover from attacks) C) Physical, network, application D) Fast, medium, slow
Answer: B — Controls are also categorized as physical, administrative, and technical.

Q416. What is network access control (NAC)?
A) A firewall brand B) A solution that enforces security policies on devices before allowing network access — checking patch level, antivirus status, and certificate C) A VPN D) An authentication system
Answer: B — NAC prevents unpatched or non-compliant devices from joining the network.

Q417. What is micro-segmentation?
A) Small network devices B) Dividing a network into very small segments with granular security policies at the workload level — even individual VMs or containers C) VLAN segmentation D) Physical network division
Answer: B — Micro-segmentation limits lateral movement to a far greater degree than traditional VLAN segmentation.

Q418. What is a security operations model?
A) A physical model B) The organizational structure and processes defining how security monitoring, detection, and response are conducted — in-house SOC, managed SOC (MSSP), or hybrid C) A network diagram D) A compliance framework
Answer: B — Most organizations choose between building an internal SOC or outsourcing to an MSSP.

Q419. What is a managed security service provider (MSSP)?
A) A cloud hosting provider B) A third-party provider delivering security services — SOC monitoring, SIEM management, vulnerability scanning, and incident response — on behalf of an organization C) An ISP D) A software vendor
Answer: B — MSSPs are used by organizations lacking the resources for a full in-house security team.

Q420. What is security by design?
A) Pretty interfaces B) Integrating security principles into systems from the beginning of the design phase rather than adding security controls afterward C) Designing firewall rules D) Physical security design
Answer: B — Security by design is far more effective and cheaper than retrofitting security.

---

TOPIC 28: SECURITY ARCHITECTURE — FILL IN THE BLANK

Q421. ________ is a security architecture pattern where all microservices communicate through a single entry point that enforces authentication, rate limiting, and logging.
Answer: API gateway

Q422. ________ is an architecture where a dedicated proxy (sidecar) handles all network communication for a service, providing mTLS, logging, and access control without changing application code.
Answer: Service mesh (e.g., Istio, Linkerd)

Q423. ________ is a security design principle stating that a system should fail in a secure state — defaulting to denial rather than access when an error occurs.
Answer: Fail secure (or fail closed)

Q424. ________ is the security principle of simplifying system design to reduce the complexity that leads to vulnerabilities.
Answer: Economy of mechanism (KISS — Keep It Simple)

Q425. ________ is the security principle that security should not depend on the secrecy of the design or implementation, only on the secrecy of keys.
Answer: Kerckhoffs's principle (or security through obscurity is insufficient)

---

TOPIC 29: FORENSICS AND EVIDENCE — CONCEPT MCQ

Q426. What is the order of volatility in digital forensics?
A) Alphabetical B) The sequence for collecting digital evidence from most volatile (lost fastest) to least volatile — RAM, network connections, running processes, disk, logs, archives C) By importance D) By file size
Answer: B — Evidence must be collected in order of volatility to preserve the most perishable data first.

Q427. What is a write blocker?
A) A data encryption device B) A hardware or software device preventing any writes to a storage medium during forensic acquisition, preserving original evidence integrity C) A content filter D) A firewall
Answer: B — Using a write blocker ensures the forensic process does not alter evidence.

Q428. What is MD5/SHA-256 hashing used for in forensics?
A) Encrypting evidence B) Verifying that a forensic copy is identical to the original — comparing hashes of the original and copy proves no alteration occurred C) Compressing files D) Searching files
Answer: B — Hash verification is fundamental to establishing forensic evidence integrity.

Q429. What is an artifact in digital forensics?
A) A historical object B) Any digital remnant left by user or system activity — browser history, registry keys, event logs, prefetch files, shellbags — that provides investigative insight C) A malware file D) A backup
Answer: B — Forensic investigators analyze artifacts to reconstruct timelines and activity.

Q430. What is file carving?
A) Editing files B) Recovering deleted files from unallocated disk space by searching for file signatures (magic bytes) without relying on the file system metadata C) Encrypting files D) Archiving files
Answer: B — File carving can recover deleted files even when directory entries are overwritten.

Q431. What is timeline analysis in forensics?
A) A project schedule B) Creating a chronological sequence of events from timestamps across multiple sources — file system metadata, event logs, browser history — to reconstruct attacker activity C) A compliance audit D) A network diagram
Answer: B — Timeline analysis is the core technique for understanding incident scope and attacker actions.

Q432. What is the Windows Registry in a forensic context?
A) A file directory B) A rich forensic artifact containing evidence of program execution, USB connections, user activity, recently accessed files, and persistence mechanisms C) An event log D) A network configuration
Answer: B — Key forensic registry locations: NTUSER.DAT, SYSTEM, SOFTWARE, SAM hives.

Q433. What is a Windows Event ID 4624?
A) A file access event B) A successful logon event — one of the most important Windows security events for tracking authentication and lateral movement C) A process creation D) A policy change
Answer: B — Other critical Event IDs: 4625 (failed logon), 4688 (process creation), 4698 (scheduled task), 4720 (account created).

Q434. What is Volatility?
A) A market metric B) An open-source memory forensics framework for analyzing RAM dumps — extracting process lists, network connections, registry hives, and malware from memory C) A network tool D) A log analyzer
Answer: B — Volatility is the standard tool for memory forensics investigations.

Q435. What is Autopsy?
A) A medical procedure B) An open-source digital forensics platform providing a GUI for analyzing disk images — file system analysis, keyword search, timeline, and artifact extraction C) A network scanner D) A SIEM
Answer: B — Autopsy is built on The Sleuth Kit and is widely used in investigations and training.

---

TOPIC 29: FORENSICS — FILL IN THE BLANK

Q436. ________ is the Windows artifact recording the last 128 applications executed on a system, including execution count and timestamp.
Answer: Prefetch files (C:\Windows\Prefetch)

Q437. ________ is a Windows forensic artifact in the registry recording folder access history in Explorer, revealing attacker navigation of the file system.
Answer: Shellbags (USRCLASS.DAT hive)

Q438. ________ is a Linux file recording all successful and failed authentication attempts.
Answer: /var/log/auth.log (or /var/log/secure on RHEL-based systems)

Q439. ________ is the technique of recovering deleted email artifacts from Outlook PST/OST files.
Answer: Email forensics (PST carving)

Q440. ________ is a Windows artifact recording the last 10 commands typed in each application's open file dialog.
Answer: RecentDocs (or OpenSaveMRU registry key)

---

TOPIC 30: THREAT MODELING AND RISK — SCENARIO

Q441. You are threat modeling a new mobile banking application. Walk through the STRIDE analysis.
Answer: Spoofing — attacker impersonates a legitimate user or server (mitigations: MFA, certificate pinning). Tampering — attacker modifies transaction data in transit (mitigations: TLS, request signing, HMAC). Repudiation — user denies performing a transaction (mitigations: signed audit logs, non-repudiation in transactions). Information Disclosure — attacker intercepts account data (mitigations: TLS, encryption at rest, minimal data exposure). Denial of Service — attacker floods the API making the app unavailable (mitigations: rate limiting, DDoS protection, circuit breakers). Elevation of Privilege — regular user accesses another user's accounts or admin functions (mitigations: server-side authorization checks, least privilege, IDOR prevention). Document findings, rate by severity, and assign mitigations to each threat before development begins.

Q442. A risk assessment shows a vulnerability with high likelihood but very low impact. How do you treat it?
Answer: Risk = Likelihood × Impact. High likelihood × Low impact = Medium-low risk. Options: Accept the risk if remediation cost exceeds potential impact. Implement low-cost mitigations to reduce likelihood. Monitor it and revisit if business context changes. Do not over-invest in mitigating low-impact risks when high-impact risks need attention. Document the decision and the rationale in the risk register. Risk acceptance should be formal and signed off by appropriate business owners, not just security.

Q443. You are asked to assess the security risk of a new third-party SaaS vendor processing your customer data. What do you evaluate?
Answer: Third-party risk assessment covers: security certifications (SOC 2 Type II, ISO 27001, PCI-DSS), data protection practices (encryption, access controls, backup, breach notification procedures), subprocessor chain (who does the vendor share data with), incident history, penetration testing frequency, employee security training, data residency and sovereignty, contractual protections (DPA — Data Processing Agreement for GDPR), right to audit, and their vulnerability management program. Use a standardized questionnaire (SIG, CAIQ) and review their security documentation. Higher data sensitivity requires deeper due diligence.

Q444. Your organization operates critical infrastructure. A risk assessment identifies a critical vulnerability in an industrial control system that cannot be patched because it would require shutting down production for a week. What do you do?
Answer: This is a common OT/ICS challenge where patching may cause operational impact. Options: Network segmentation — isolate the vulnerable system behind strict firewall rules allowing only necessary communication. Disable unnecessary services and communication paths on the device. Implement compensating controls: IDS monitoring for exploitation indicators, application whitelisting on adjacent systems, strict physical access controls. Document the accepted risk formally with business sign-off. Work with the vendor on a maintenance window plan for future patching. Establish continuous monitoring for signs of exploitation. Evaluate whether a virtual patch (IPS rule) can detect and block exploitation attempts.

Q445. You discover a legacy system running Windows Server 2003 that is connected to the production network. What are the risks and what do you do?
Answer: Windows Server 2003 has been end-of-life since 2015 — no security patches available for the past decade of vulnerabilities. Risks: critical unpatched vulnerabilities (EternalBlue/MS17-010 affects 2003), attackers can use it as a pivot point, no modern security controls (no PowerShell 5, no advanced auditing). Immediate actions: isolate from the production network — place behind a dedicated firewall with minimal allowed communications, apply strict access controls, enable all available logging. Long-term: plan migration or decommission. Assess what function the system serves and whether it can be replaced. If it hosts a critical application, work with the vendor on a supported platform upgrade.

---

TOPIC 31: CLOUD-NATIVE SECURITY — ADDITIONAL

Q446. What is a cloud workload protection platform (CWPP)?
Answer: A security solution providing visibility and protection for cloud workloads — VMs, containers, and serverless functions — across multi-cloud environments. Capabilities include vulnerability scanning, runtime protection, and compliance monitoring.

Q447. What is CNAPP?
Answer: Cloud-Native Application Protection Platform — a unified platform combining CSPM (infrastructure configuration), CWPP (workload protection), CIEM (identity entitlement management), and container security into a single solution. Examples: Wiz, Prisma Cloud, Lacework.

Q448. What is CIEM?
Answer: Cloud Infrastructure Entitlement Management — a category of security tools that analyze and manage identity permissions across cloud environments, identifying excessive permissions, unused entitlements, and risky IAM configurations that violate least privilege.

Q449. What is cloud detection and response (CDR)?
Answer: Security monitoring and incident response capabilities specifically for cloud environments — collecting and analyzing cloud logs (CloudTrail, VPC flow logs, GCP audit logs) to detect threats like compromised IAM credentials, cryptomining, data exfiltration, and lateral movement.

Q450. What is serverless security?
Answer: Security considerations specific to serverless computing (AWS Lambda, Azure Functions) — each function has its own IAM role (least privilege per function), input validation (event data from untrusted sources), dependency scanning (function packages), logging (CloudWatch), and preventing function event injection attacks.

---

TOPIC 32: ADVANCED ATTACK TECHNIQUES — FILL IN THE BLANK

Q451. ________ is a technique where the attacker manipulates the target into navigating to a URL that causes the target's browser to send a request the attacker crafted.
Answer: CSRF (Cross-Site Request Forgery)

Q452. ________ is an attack where the attacker poisons a shared cache (DNS, ARP, web cache) to redirect victims to malicious resources.
Answer: Cache poisoning

Q453. ________ is an attack exploiting HTTP/2 server push or multiplexing to smuggle requests past security controls.
Answer: HTTP/2 request smuggling (or HTTP desync)

Q454. ________ is an attack injecting commands into a system shell through unsanitized user input passed to OS command functions.
Answer: Command injection (OS command injection)

Q455. ________ is a technique where an attacker sends a malicious file that exploits the target application when it is opened.
Answer: Client-side exploitation (or spear phishing with malicious attachment)

Q456. ________ is a web attack where the attacker abuses a server that fetches URLs on behalf of the user to access internal resources.
Answer: SSRF (Server-Side Request Forgery)

Q457. ________ is an attack against XML-based services injecting XPath queries to bypass authentication or extract data.
Answer: XPath injection

Q458. ________ is an injection attack targeting LDAP queries with specially crafted input to bypass authentication or dump directory data.
Answer: LDAP injection

Q459. ________ is an attack embedding malicious content in a file processed by a server-side template engine to execute code.
Answer: Server-Side Template Injection (SSTI)

Q460. ________ is an attack where a mass of oversized HTTP headers causes a buffer overflow or denial of service in a web server.
Answer: HTTP header overflow (or slowloris — keeping connections open with partial HTTP requests)

---

TOPIC 33: SECURITY TOOLS — CONCEPT MCQ

Q461. What is Nessus?
A) A network switch B) A widely used commercial vulnerability scanner that identifies known vulnerabilities, misconfigurations, and compliance violations across networks and systems C) A SIEM D) A penetration testing framework
Answer: B — Nessus is developed by Tenable and is the most widely deployed vulnerability scanner.

Q462. What is OpenVAS?
A) A VPN tool B) An open-source vulnerability scanning framework — the community edition of what was originally GreenBone/Nessus C) A firewall D) A password manager
Answer: B — OpenVAS is widely used in organizations that cannot afford commercial scanners.

Q463. What is Snort?
A) A networking term B) An open-source network intrusion detection and prevention system using signature-based and anomaly-based detection C) A vulnerability scanner D) A firewall
Answer: B — Snort is one of the most deployed IDS/IPS systems globally.

Q464. What is Suricata?
A) A security framework B) An open-source, high-performance network IDS/IPS and network security monitoring engine, supporting multi-threading and YAML rule format C) A SIEM D) A scanner
Answer: B — Suricata is often used as a modern, high-throughput alternative to Snort.

Q465. What is Hashcat?
A) A network tool B) A high-performance password cracking tool supporting many hash types and attack modes (dictionary, brute force, rule-based, mask) using GPU acceleration C) A scanning tool D) A forensics tool
Answer: B — Hashcat can crack billions of password hashes per second on modern GPUs.

Q466. What is John the Ripper?
A) A network protocol B) An open-source password cracking tool supporting many hash formats, with automatic hash type detection C) A web scanner D) An exploit framework
Answer: B — John the Ripper is commonly used in penetration testing and forensics.

Q467. What is Aircrack-ng?
A) A compression tool B) A network security suite for Wi-Fi security assessment — capturing WPA2 handshakes, cracking WEP/WPA keys, and testing wireless networks C) A router firmware D) A network monitor
Answer: B — Aircrack-ng is the standard toolkit for wireless penetration testing.

Q468. What is theHarvester?
A) A farming tool B) A passive OSINT tool for gathering email addresses, subdomains, hosts, employee names, and open ports from public sources C) A scanning tool D) An exploit framework
Answer: B — theHarvester is commonly used in the reconnaissance phase of penetration testing.

Q469. What is Shodan?
A) A regular search engine B) A search engine for internet-connected devices — indexing open ports, running services, banners, and vulnerabilities of publicly exposed devices and systems C) A threat intel feed D) A web crawler
Answer: B — Shodan is used by both attackers for reconnaissance and defenders for attack surface discovery.

Q470. What is CyberChef?
A) A cooking website B) A web-based tool for encoding, decoding, encrypting, decrypting, and analyzing data — used in CTF challenges and forensic investigations C) A code editor D) A SIEM
Answer: B — CyberChef is called the "Cyber Swiss Army Knife" for its versatility.

---

TOPIC 33: SECURITY TOOLS — FILL IN THE BLANK

Q471. ________ is the command-line packet capture tool equivalent to Wireshark, used in headless environments.
Answer: tcpdump

Q472. ________ is a tool for web content discovery — brute-forcing directories and files on web servers.
Answer: Gobuster (or dirb, ffuf, dirbuster)

Q473. ________ is a fast web vulnerability scanner checking for 6700+ potentially dangerous files and outdated server software.
Answer: Nikto

Q474. ________ is a tool for SSL/TLS configuration analysis checking for weak ciphers, protocol versions, and certificate issues.
Answer: testssl.sh (or sslyze)

Q475. ________ is a DNS enumeration tool for discovering subdomains using dictionary attacks and public sources.
Answer: Sublist3r (or amass, subfinder)

---

TOPIC 34: SECURE CODING — FILL IN THE BLANK

Q476. ________ is a secure coding practice ensuring that all function inputs are validated for type, length, format, and range before processing.
Answer: Input validation

Q477. ________ is a coding vulnerability where an integer value exceeds its maximum value and wraps around to a negative or zero value, causing unexpected behavior.
Answer: Integer overflow

Q478. ________ is the practice of ensuring that errors do not reveal sensitive system information and are handled gracefully without crashing the application.
Answer: Secure error handling

Q479. ________ is a memory safety vulnerability where an application writes beyond the end of a stack-allocated buffer, overwriting the return address.
Answer: Stack buffer overflow

Q480. ________ is a coding practice ensuring sensitive data like passwords, credit cards, and keys are never written to log files.
Answer: Log sanitization (or sensitive data exclusion from logs)

---

TOPIC 35: MISCELLANEOUS ADVANCED — CONCEPT MCQ

Q481. What is an intrusion prevention system (IPS)?
A) A passive monitor B) A network security device that monitors traffic and actively blocks detected attacks in real time, unlike IDS which only alerts C) A firewall D) A vulnerability scanner
Answer: B — IPS is inline and can drop malicious packets. IDS is out-of-band and only alerts.

Q482. What is endpoint detection and response (EDR)?
A) Antivirus B) A security solution continuously recording and analyzing endpoint activity to detect, investigate, and respond to threats that evade traditional antivirus C) A SIEM D) A network monitor
Answer: B — EDR provides visibility into process execution, file changes, network connections, and registry modifications.

Q483. What is extended detection and response (XDR)?
A) EDR for networks B) A security platform integrating data from endpoints, network, cloud, email, and identity into a unified detection and response solution with cross-layer correlation C) A SIEM D) A threat intel feed
Answer: B — XDR reduces silos between security tools and enables correlated detection across the entire kill chain.

Q484. What is user and entity behavior analytics (UEBA)?
A) User account management B) A security analytics capability using machine learning to baseline normal user and system behavior, then detect anomalous deviations that may indicate compromise or insider threats C) A SIEM feature D) An identity tool
Answer: B — UEBA is particularly effective for detecting insider threats and compromised accounts.

Q485. What is security information and event management (SIEM)?
A) A firewall B) A platform collecting, aggregating, correlating, and analyzing security events from across an organization to detect threats and support compliance reporting C) An IDS D) A log server
Answer: B — Modern SIEMs incorporate UEBA, SOAR, and threat intelligence integration.

Q486. What is a cyber threat intelligence (CTI) feed?
A) A news feed B) A stream of data about current threats — malicious IP addresses, domain names, file hashes, and TTPs — shared by vendors, government agencies, or communities to improve defensive controls C) A vulnerability database D) A log stream
Answer: B — CTI feeds are consumed by SIEM, firewalls, EDR, and email gateways to block known threats.

Q487. What is threat emulation?
A) Copying threats B) Simulating specific threat actor TTPs against an organization's environment to test whether existing security controls can detect and respond to those specific techniques C) Vulnerability scanning D) Pen testing
Answer: B — Tools like MITRE Caldera and Atomic Red Team enable threat emulation.

Q488. What is purple teaming?
A) A team color B) A collaborative exercise where red team (offense) and blue team (defense) work together to improve detection and response — red team executes techniques while blue team validates logging and alerting C) A compliance exercise D) A training program
Answer: B — Purple teaming is more efficient than adversarial red/blue exercises for improving specific detection gaps.

Q489. What is the cyber kill chain?
A) A ransomware technique B) A framework by Lockheed Martin describing the seven stages of a cyberattack: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control, Actions on Objectives C) A malware type D) An incident response model
Answer: B — Defenders can interrupt an attack at any stage of the kill chain.

Q490. What is the diamond model of intrusion analysis?
A) A gem-shaped diagram B) A threat intelligence framework representing intrusions as relationships between four elements: Adversary, Capability, Infrastructure, and Victim C) A network diagram D) A risk model
Answer: B — The diamond model helps analysts understand and pivot on intrusion relationships.

---

TOPIC 35: MISCELLANEOUS ADVANCED — FILL IN THE BLANK

Q491. ________ is an attack technique where an attacker exploits a vulnerable driver to gain kernel-level code execution on Windows.
Answer: Bring Your Own Vulnerable Driver (BYOVD)

Q492. ________ is a Windows security feature that verifies the integrity of critical OS files and processes at kernel level.
Answer: Kernel Patch Protection (PatchGuard) or Windows Defender System Guard

Q493. ________ is a technique for executing arbitrary code in a 64-bit process using a 32-bit code segment — used in browser exploits.
Answer: Heaven's Gate (or segment selector technique)

Q494. ________ is a process for systematically identifying all assets in an organization's environment and their security posture.
Answer: Asset inventory and management (or cyber asset attack surface management — CAASM)

Q495. ________ is the security principle that all access should be logged and auditable, and users should not be able to cover their tracks.
Answer: Accountability (or non-repudiation through audit logging)

Q496. ________ is a Windows feature using virtualization-based security to isolate the LSA process, preventing credential theft via LSASS dumping.
Answer: Credential Guard

Q497. ________ is a Windows security feature requiring driver code signing, preventing unsigned kernel drivers from loading.
Answer: Driver Signature Enforcement (DSE)

Q498. ________ is the practice of periodically reviewing and removing unnecessary user accounts, privileges, and group memberships.
Answer: Access recertification (or privilege review / access review)

Q499. ________ is a governance framework providing guidance on security controls specifically for industrial control systems and operational technology.
Answer: IEC 62443 (or NIST SP 800-82 for ICS security)

Q500. What is the most important principle underlying all of cybersecurity?
Answer: Risk management — cybersecurity is not about achieving perfect security (which is impossible) but about making informed decisions to reduce risk to an acceptable level within business constraints. Every security control is a tradeoff between cost, usability, and risk reduction. The best security professionals understand business context, think like attackers, communicate risk clearly to decision-makers, and allocate limited resources where they provide the greatest risk reduction. Technical knowledge is the tool — sound judgment is the craft.