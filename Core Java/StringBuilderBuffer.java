public class StringBuilderBuffer {

    static void palindrome(String s1){

        StringBuilder sbP =  new StringBuilder(s1);
        if(sbP.reverse().toString().equals(s1)){
            System.out.println(sbP+ " is palindrome");
        }
    }
    public static void main(String[] args){
        StringBuffer sbf= new StringBuffer("hello");
        StringBuilder sb= new StringBuilder("hello");
        sbf.append("_sbf");
        sb.append("_sb");
        String str1 = "";
        for(int i=sbf.length()-1; i>=0 ; i--){
            str1 +=sbf.charAt(i);
        }
        System.out.println(str1);
        System.out.println(sb.reverse());
        System.out.println(sbf.reverse());

        palindrome("madam");
    }
}
