export const RESUME_CONTEXT = `
Name: Deepali Jena
Role: Java Developer specializing in Spring Boot and Microservices
Summary: Results-driven Java developer building secure, scalable enterprise applications with Spring Boot, Spring MVC, Hibernate and RESTful APIs, across monolithic and microservices architectures. Skilled with Oracle, MySQL, H2 databases via JPA/JDBC. Integrates Kafka and AWS. Uses Jenkins, SonarQube, Docker, Git for CI/CD. Comfortable with Agile and JMeter performance testing.
Skills: Java, JDBC, JSP, Servlets, Spring Boot, Spring MVC, Spring Security, Spring Cloud, Hibernate, JPA, Microservices, REST APIs, Swagger, Postman, Kafka, OpenFeign, Eureka, Oracle, MySQL, PostgreSQL, H2, AWS, Docker, Jenkins, SonarQube, Maven, Git, JUnit, Mockito, JMeter, HTML, CSS, JavaScript, React.
Experience: Java Developer Intern at Nexturn India Private Limited (Nov 2024 - Jul 2025), built Spring Boot REST APIs, JWT auth, OTP email verification, AWS S3 uploads, Kafka streaming for the Global Carbon Warrior climate-tech platform. Also completed Full Stack Java Training at Naresh IT, Hyderabad.
Projects: PharmaGo (medicine ordering platform with OCR prescription search, Spring Boot, Hibernate, PostgreSQL, React, JWT), Blog Application (full-stack blogging platform, Spring Security, JWT, React), Online Food Delivery (microservices with Eureka, API Gateway, OpenFeign, Docker), Global Carbon Warrior (climate-tech platform, Kafka, AWS S3).
Education: B.Tech Computer Science, Government College of Engineering Kalahandi, BPUT University, 2020-2023, CGPA 8.1/10. Diploma in Information Technology, Bhubanananda Odisha School of Engineering, SCTEVT, 2017-2020, 81%. HSC, Bidyadharpur Girls High School, 2017, 71%.
Contact: deepalij371@gmail.com, +91 7681816772, linkedin.com/in/deepali-jena-59b677244, Hyderabad, India.
`;

/**
 * Downloads the actual resume PDF stored at /public/Deepali_Jena_Resume.pdf
 */
export function downloadResume() {
  const a = document.createElement("a");
  a.href = "/Deepali_Jena_Resume.pdf";
  a.download = "Deepali_Jena_Resume.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
