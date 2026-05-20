<!-- Task -->
So we are task to compile our case studies using website, so create a website compiling all of the attatched codes below.

<!-- Tech Stack -->
-HTML
-CSS
-JAVASCRIPT
-C#

<!-- IMPORTANT NOTES -->
USE MODEL VIEW CONTROLLER!!


<!-- INSTRUCTIONS -->
index is the home
the tabs, is on the tabs folder, stitch that to home

<!-- Palindrome checker -->
import java.util.Scanner;

public class PalindromeChecker {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String input = scanner.nextLine();

        System.out.println("String entered: " + input);

        int len = input.length();
        System.out.println("Length of the string: " + len);

        boolean isPalindrome = true;
        int left = 0;
        int right = len - 1;

        while (left < right) {
            if (input.charAt(left) != input.charAt(right)) {
                isPalindrome = false;
                break;
            }
            left++;
            right--;
        }

        if (isPalindrome) {
            System.out.println("Result: The string IS a palindrome.");
        } else {
            System.out.println("Result: The string is NOT a palindrome.");
        }
        
        scanner.close();
    }
}


<!-- CollatzSequence -->
import java.util.Scanner;

public class CollatzSequence {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char choice;

        do {
            int num = 0;

            System.out.println("This program will find all the terms of the Collatz sequence.");

            // Input validation loop
            while (true) {
                System.out.print("Input the initial value: ");

                try {
                    num = scanner.nextInt();

                    if (num <= 0 || num % 2 == 0) {
                        System.out.println("INVALID OUTPUT");
                    } else {
                        break; // valid input
                    }

                } catch (Exception e) {
                    System.out.println("INVALID OUTPUT");
                    scanner.next(); // clear invalid input
                }
            }

            // Print sequence
            System.out.print("The Collatz sequence are: ");
            printCollatz(num);
            System.out.println(); 


            System.out.print("Do you want to try again? (Y/N): ");
            choice = scanner.next().charAt(0);

            System.out.println();

        } while (choice == 'Y' || choice == 'y');

        System.out.println("Program terminated.");
        scanner.close();
    }

    public static void printCollatz(int n) {
        while (true) {
            System.out.printf("%,d", n);

            if (n == 1) {
                break;
            }

            System.out.printf(", ");

            if (n % 2 == 1) {   // odd
                n = 3 * n + 1;
            } else {            // even
                n = n / 2;
            }
        }
    }
}


<!-- DivisionAlgorithm -->

import java.util.Scanner;

public class DivisionAlgorithm {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = 0, b = 0;

        // Input validation
        while (true) {
            try {
                System.out.print("Enter the first integer: ");
                a = scanner.nextInt();

                System.out.print("Enter the second integer: ");
                b = scanner.nextInt();

                if (a > 0 && b > 0) {
                    break;
                } else {
                    System.out.println("INVALID INPUT. Please enter positive integers.\n");
                }

            } catch (Exception e) {
                System.out.println("INVALID INPUT. Please enter integers only.\n");
                scanner.next();
            }
        }

        // Assign dividend and divisor
        int dividend = Math.max(a, b);
        int divisor = Math.min(a, b);

        int quotient = dividend / divisor;
        int remainder = dividend % divisor;

        // Output
        System.out.println("\nSOLUTION:");
        System.out.println(dividend + " = " + divisor + " (" + quotient + ") + " + remainder);
        System.out.println("The dividend is " + dividend);
        System.out.println("The divisor is " + divisor);
        System.out.println("The quotient is " + quotient + " and the remainder is " + remainder);

        scanner.close();
    }
}

<!-- EuclideanAlgorithm -->
import java.util.Scanner;

public class EuclideanAlgorithm {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int a = 0, b = 0;

        // Input validation
        while (true) {
            try {
                System.out.print("Enter the first integer: ");
                a = scanner.nextInt();

                System.out.print("Enter the second integer: ");
                b = scanner.nextInt();

                if (a > 0 && b > 0) {
                    break;
                } else {
                    System.out.println("INVALID INPUT. Please enter positive integers.\n");
                }

            } catch (Exception e) {
                System.out.println("INVALID INPUT. Please enter integers only.\n");
                scanner.next();
            }
        }

        // Assign m (larger) and n (smaller)
        int m = Math.max(a, b);
        int n = Math.min(a, b);

        int tempM = m;
        int tempN = n;

        System.out.println("\nSOLUTION:");

        // Euclidean Algorithm steps
        while (tempN != 0) {
            int q = tempM / tempN;
            int r = tempM % tempN;

            if (r != 0) {
                System.out.println(tempM + " = " + tempN + " (" + q + ") + " + r);
            } else {
                System.out.println(tempM + " = " + tempN + " (" + q + ")");
            }

            tempM = tempN;
            tempN = r;
        }

        int gcd = tempM;
        int lcm = (m * n) / gcd;

        // Final Output
        System.out.println("\nThe integers are " + m + " and " + n);
        System.out.println("The greatest common divisor of " + m + " and " + n + " is " + gcd);
        System.out.println("The least common multiple of " + m + " and " + n + " is " + lcm);

        scanner.close();
    }
}

<!-- RecursiveSequencesGUI -->
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class RecursiveSequencesGUI extends JFrame implements ActionListener {

    JButton fibonacciButton, lucasButton, tribonacciButton, exitButton;
    JTextArea outputArea;

    public RecursiveSequencesGUI() {

        // Frame Settings
        setTitle("Recursive Sequences");
        setSize(700, 500);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Main Panel
        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());

        // Title
        JLabel title = new JLabel("AUTOMATA THEORY AND FORMAL LANGUAGES", JLabel.CENTER);
        title.setFont(new Font("Arial", Font.BOLD, 20));
        panel.add(title, BorderLayout.NORTH);

        // Buttons Panel
        JPanel buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(1, 4, 10, 10));

        fibonacciButton = new JButton("Fibonacci");
        lucasButton = new JButton("Lucas");
        tribonacciButton = new JButton("Tribonacci");
        exitButton = new JButton("Exit");

        fibonacciButton.addActionListener(this);
        lucasButton.addActionListener(this);
        tribonacciButton.addActionListener(this);
        exitButton.addActionListener(this);

        buttonPanel.add(fibonacciButton);
        buttonPanel.add(lucasButton);
        buttonPanel.add(tribonacciButton);
        buttonPanel.add(exitButton);

        panel.add(buttonPanel, BorderLayout.SOUTH);

        // Output Area
        outputArea = new JTextArea();
        outputArea.setFont(new Font("Monospaced", Font.PLAIN, 16));
        outputArea.setEditable(false);

        JScrollPane scrollPane = new JScrollPane(outputArea);
        panel.add(scrollPane, BorderLayout.CENTER);

        add(panel);
        setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == fibonacciButton) {
            showFibonacci();

        } else if (e.getSource() == lucasButton) {
            showLucas();

        } else if (e.getSource() == tribonacciButton) {
            showTribonacci();

        } else if (e.getSource() == exitButton) {
            int confirm = JOptionPane.showConfirmDialog(
                    this,
                    "Are you sure you want to exit?",
                    "Exit",
                    JOptionPane.YES_NO_OPTION
            );

            if (confirm == JOptionPane.YES_OPTION) {
                System.exit(0);
            }
        }
    }

    // ========================= FIBONACCI =========================

    private void showFibonacci() {

        outputArea.setText("");

        String discussion =
                "FIBONACCI NUMBERS\n\n" +
                "The Fibonacci sequence is a recursive sequence where\n" +
                "each number is the sum of the two previous numbers.\n\n" +
                "Formula:\n" +
                "F(n) = F(n-1) + F(n-2)\n\n" +
                "Starting Values:\n" +
                "0, 1\n\n";

        outputArea.append(discussion);

        while (true) {

            try {

                String input = JOptionPane.showInputDialog(
                        this,
                        "Input the number of Fibonacci terms (greater than 2):"
                );

                // Cancel button handling
                if (input == null) {
                    return;
                }

                int n = Integer.parseInt(input);

                if (n <= 2) {
                    JOptionPane.showMessageDialog(
                            this,
                            "Input must be greater than 2.",
                            "Invalid Input",
                            JOptionPane.ERROR_MESSAGE
                    );
                    continue;
                }

                outputArea.append("The Fibonacci numbers are:\n");

                for (int i = 0; i < n; i++) {
                    outputArea.append(fibonacci(i) + "");

                    if (i != n - 1) {
                        outputArea.append(", ");
                    }
                }

                outputArea.append("\n\n");
                break;

            } catch (NumberFormatException ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Invalid input. Integers only.",
                        "Error",
                        JOptionPane.ERROR_MESSAGE
                );

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Unexpected Error: " + ex.getMessage(),
                        "Error",
                        JOptionPane.ERROR_MESSAGE
                );
            }
        }
    }

    private int fibonacci(int n) {

        if (n == 0)
            return 0;

        if (n == 1)
            return 1;

        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    // ========================= LUCAS =========================

    private void showLucas() {

        outputArea.setText("");

        String discussion =
                "LUCAS NUMBERS\n\n" +
                "The Lucas sequence is similar to Fibonacci,\n" +
                "but starts with 2 and 1.\n\n" +
                "Formula:\n" +
                "L(n) = L(n-1) + L(n-2)\n\n" +
                "Starting Values:\n" +
                "2, 1\n\n";

        outputArea.append(discussion);

        while (true) {

            try {

                String input = JOptionPane.showInputDialog(
                        this,
                        "Input the number of Lucas terms (greater than 2):"
                );

                if (input == null) {
                    return;
                }

                int n = Integer.parseInt(input);

                if (n <= 2) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Input must be greater than 2.",
                            "Invalid Input",
                            JOptionPane.ERROR_MESSAGE
                    );

                    continue;
                }

                outputArea.append("The Lucas numbers are:\n");

                for (int i = 0; i < n; i++) {

                    outputArea.append(lucas(i) + "");

                    if (i != n - 1) {
                        outputArea.append(", ");
                    }
                }

                outputArea.append("\n\n");
                break;

            } catch (NumberFormatException ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Invalid input. Integers only.",
                        "Error",
                        JOptionPane.ERROR_MESSAGE
                );

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Unexpected Error: " + ex.getMessage(),
                        "Error",
                        JOptionPane.ERROR_MESSAGE
                );
            }
        }
    }

    private int lucas(int n) {

        if (n == 0)
            return 2;

        if (n == 1)
            return 1;

        return lucas(n - 1) + lucas(n - 2);
    }

    // ========================= TRIBONACCI =========================

    private void showTribonacci() {

        outputArea.setText("");

        String discussion =
                "TRIBONACCI NUMBERS\n\n" +
                "The Tribonacci sequence is similar to Fibonacci,\n" +
                "but each term is the sum of the previous THREE terms.\n\n" +
                "Formula:\n" +
                "T(n) = T(n-1) + T(n-2) + T(n-3)\n\n" +
                "Starting Values:\n" +
                "0, 0, 1\n\n";

        outputArea.append(discussion);

        while (true) {

            try {

                String input = JOptionPane.showInputDialog(
                        this,
                        "Input the number of Tribonacci terms (greater than 3):"
                );

                if (input == null) {
                    return;
                }

                int n = Integer.parseInt(input);

                if (n <= 3) {

                    JOptionPane.showMessageDialog(
                            this,
                            "Input must be greater than 3.",
                            "Invalid Input",
                            JOptionPane.ERROR_MESSAGE
                    );

                    continue;
                }

                outputArea.append("The Tribonacci numbers are:\n");

                for (int i = 0; i < n; i++) {

                    outputArea.append(tribonacci(i) + "");

                    if (i != n - 1) {
                        outputArea.append(", ");
                    }
                }

                outputArea.append("\n\n");
                break;

            } catch (NumberFormatException ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Invalid input. Integers only.",
                        "Error",
                        JOptionPane.ERROR_MESSAGE
                );

            } catch (Exception ex) {

                JOptionPane.showMessageDialog(
                        this,
                        "Unexpected Error: " + ex.getMessage(),
                        "Error",
                        JOptionPane.ERROR_MESSAGE
                );
            }
        }
    }

    private int tribonacci(int n) {

        if (n == 0)
            return 0;

        if (n == 1)
            return 0;

        if (n == 2)
            return 1;

        return tribonacci(n - 1)
                + tribonacci(n - 2)
                + tribonacci(n - 3);
    }

    // ========================= MAIN =========================

    public static void main(String[] args) {

        try {

            UIManager.setLookAndFeel(
                    UIManager.getSystemLookAndFeelClassName()
            );

        } catch (Exception e) {

            System.out.println("Look and Feel Error.");
        }

        new RecursiveSequencesGUI();
    }
}


