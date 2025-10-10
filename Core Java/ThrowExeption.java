

class ThrowExeption {
    public static void main(String[] args) {
        A(); // call starts here
    }

    static void A() {
        B();
    }

    static void B() {
        C();
    }

    static void C() {
        throw new RuntimeException("Something went wrong!");
    }
}

// 👉 Here’s what happens:

// Step	Action
// 1	Exception created in C()
// 2	JVM looks inside C() — any try–catch? ❌
// 3	Moves up to B() — any try–catch? ❌
// 4	Moves up to A() — any try–catch? ❌
// 5	Moves up to main() — any try–catch? ❌
// 6	No match found → JVM’s default handler prints stack trace and kills program

// Now let’s modify B():
static void B() {
    try {
        C();
    } catch (RuntimeException e) {
        System.out.println("Handled inside B!");
    }
}
// 👉 New flow:

// Step	Action
// 1	Exception thrown from C()
// 2	JVM finds matching catch inside B()
// 3	Stops propagation right there
// 4	Executes the catch block (“Handled inside B!”)
// 5	Program continues normally — JVM never sees it
