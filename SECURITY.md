# Security Policy

## Supported Versions

We release security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

We take the security of Nimbly seriously. If you believe you have found a security vulnerability, please report it to us as described below.

### Please Do NOT:

- Open a public GitHub issue
- Discuss the vulnerability in public forums, social media, or mailing lists

### Please DO:

1. **Email us** at security@nimbly.dev (or create a GitHub security advisory)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)
3. **Wait** for our response (we aim to respond within 48 hours)

### What to Expect:

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Investigation**: We'll investigate and keep you updated
- **Fix**: If valid, we'll work on a fix and security advisory
- **Credit**: We'll credit you in the security advisory (unless you prefer to remain anonymous)
- **Disclosure**: We'll coordinate the disclosure timeline with you

## Security Best Practices

When using Nimbly in production:

### 1. Environment Variables

- **Never commit** sensitive credentials to version control
- Use environment variables or secrets management tools
- Rotate credentials regularly

```bash
# Bad - Don't do this!
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE

# Good - Use environment variables
export AWS_ACCESS_KEY_ID=$(vault read secret/aws/access_key)
```

### 2. API Keys

- Store API keys in secure vaults (AWS Secrets Manager, HashiCorp Vault)
- Use IAM roles and service accounts when possible
- Implement key rotation policies

### 3. Network Security

- Run backend API behind a firewall
- Use HTTPS/TLS for all communications
- Implement rate limiting and DDoS protection

### 4. Database Security

- Enable encryption at rest and in transit
- Use parameterized queries (we do this by default)
- Implement regular backups
- Restrict database access by IP

### 5. Authentication & Authorization

- Use strong, unique passwords
- Enable two-factor authentication
- Implement proper RBAC (Role-Based Access Control)
- Audit access logs regularly

### 6. Container Security

- Use official base images
- Scan images for vulnerabilities
- Run containers as non-root users
- Keep dependencies updated

```dockerfile
# Good practice in Dockerfile
USER node
RUN npm audit fix
```

### 7. Monitoring & Logging

- Enable audit logging
- Monitor for suspicious activity
- Set up alerts for security events
- Regularly review logs

## Known Limitations

- **Mock Provider**: Not suitable for production use
- **Beta Features**: May have undiscovered security issues
- **Third-party Integrations**: We're not responsible for security of integrated services

## Security Updates

Subscribe to security updates:

- **GitHub**: Watch this repository with "All Activity" notifications
- **Email**: Subscribe to our security mailing list
- **RSS**: Follow our security advisory feed

## Compliance

Nimbly helps you meet compliance requirements:

- **SOC 2 Type II**: Audit trail and access controls
- **GDPR**: Data protection and privacy features
- **HIPAA**: Encryption and access logging (when properly configured)

## Responsible Disclosure

We follow the principle of responsible disclosure:

1. Report sent to security team
2. Team acknowledges within 48h
3. Investigation and fix development
4. Coordinated disclosure with reporter
5. Public advisory published
6. CVE assigned (if applicable)

## Bug Bounty Program

🚀 **Coming Soon!** We're working on launching a bug bounty program to reward security researchers.

## Contact

- **Security Email**: security@nimbly.dev
- **Security Advisories**: [GitHub Security Advisories](https://github.com/Dawaman43/Nimbly/security/advisories)
- **PGP Key**: Available upon request

---

**Thank you** for helping keep Nimbly and our users safe! 🔐
