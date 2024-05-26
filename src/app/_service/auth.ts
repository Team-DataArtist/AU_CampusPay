// 이메일 주소 유효성 검사
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

// 비밀번호 유효성 검사
export const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return passwordRegex.test(password);
};

/*
 * 회원가입 유효성 검사
 * 이름 유효성 검사
 */
export const isValidUsername = (username: string): boolean => {
  const nameRegex = /^[가-힣]{2,5}$/
  return nameRegex.test(username);
};

// 학번 유효성 검사
export const isValidStudentNumber = (student_number: string): boolean => {
  const student_numberRegex = /^(19|20)[0-9]{2}[0-9]{3}[0-9]{2}$/
  return student_numberRegex.test(student_number);
};

// 전화번호 유효성 검사
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^01[0-9]{1}[0-9]{4}[0-9]{4}$/
  return phoneRegex.test(phone);
};
