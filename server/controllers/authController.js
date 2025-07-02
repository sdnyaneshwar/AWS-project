import { getUserByEmail, saveUser } from "../models/userModel.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};





export const registerUser = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const existing = await getUserByEmail(email);
    if (existing) return res.status(409).json({ message: "User already exists" });

    await saveUser({ email, password, name, role });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
