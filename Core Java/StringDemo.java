public class StringDemo {
    public static void main(String[] args){
        String str= "abcdefghijklmnou";
        char[] v = {'a','e','i','o', 'u'};
        boolean vFlag = false;
        int vCount=0, cCount=0;
        for(int i=0; i< str.length(); i++){
            vFlag = false;
            for(int j=0; j< v.length; j++){
                if(str.charAt(i) == v[j]){
                    vFlag= true;
                }
            }
            if(vFlag){
                vCount++;
            }else{
                cCount++;
            }
        }

        System.out.println(vCount);
        System.out.println(cCount);

    }
}
