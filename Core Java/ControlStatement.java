public class ControlStatement {
    static void displayWeekDay(int value) {
        switch (value) {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesady");
                break;
            default:
                System.out.println("Invalid input value");
                break;
        }
    }

    static void findLargest() {
        int a = 30, b = 20, c = 20;
        if (a >= b && a >= c) {
            System.out.println(a);
        }
        if (b >= a && b >= c) {
            System.out.println(b);
        }
        if (c >= a && c >= b) {
            System.out.println(c);
        }
    }

    static void printEven(){
        for(int i=2; i<100; i++){
            if(i%2 == 0)
            System.out.println(i);
        }
    }

    static void factorial(int i){
            System.out.println("Factorial:: -");
        if(i == 0){
            System.out.println("1");
        }else{
            int res = 1;
            do{
                res *= i;
                i--;
            } while(i > 0);
            System.out.println(res);
        }

    }

    public static void main(String[] args) {
        displayWeekDay(1);
        findLargest();
        printEven();
        factorial(5);
    }
}
