public class Swap {
    public static void main(String[] str){
        int a=10, b=20;
        int c= a;
        a=b;
        b= c;
        System.out.println(a+" "+b);
        int input = 300;
        if(input%3 == 0 && input%5 == 0){
            System.out.println(input+ " is divisiblle by 3 andd 5 both.");
        }else{
            System.out.println(input + " is not divisiblle by 3 and 5.");
        }
    }
    
}
