import { add, trim } from './add';
import { roundOff } from "./round";

export function divide(dividend, divisor, precission=8){
    if(divisor == 0){
        throw new Error('Cannot divide by 0');
    }
    //console.log(dividend+'/'+divisor);
    dividend = dividend.toString();
    divisor = divisor.toString();

    //var pt_loc = (dividend.indexOf('.')>0?dividend.length-dividend.indexOf('.')-1:0)-(divisor.indexOf('.')>0?divisor.length-divisor.indexOf('.')-1:0);
    var pt_dvsr = divisor.indexOf('.')>0?divisor.length-divisor.indexOf('.')-1:-1;
    
    divisor = trim(divisor.replace('.', ''));
    if(pt_dvsr>=0){
        let pt_dvnd = dividend.indexOf('.')>0?dividend.length-dividend.indexOf('.')-1:-1;
        
        //if dividend has no decimal pt
        if(pt_dvnd == -1){
            dividend = trim(dividend+(new Array(pt_dvsr+1)).join('0'));
        }else{
            //if pt_dvsr>pt_dvnd -> 12.45/10.106 or 12.2/1.47 -> shift right
            if(pt_dvsr>pt_dvnd){
                dividend = dividend.replace('.', '');
                dividend = trim(dividend+(new Array(pt_dvsr-pt_dvnd+1)).join('0'));
            }
            //if pt_dvsr<pt_dvnd -> 12.40/14.1 or 0.078/0.7 -> shift left
            else if(pt_dvsr<pt_dvnd){
                dividend = dividend.replace('.', '');
                let loc = dividend.length-pt_dvsr+pt_dvsr;
                dividend = trim(dividend.substring(0, loc)+'.'+dividend.substring(loc));
            }
            //if equal
            else if(pt_dvsr==pt_dvnd){
                dividend = trim(dividend.replace('.', ''));
            }
        }
    }
    //console.log('equivalent:'+dividend+'/'+divisor);
    let prec = 0, dl = divisor.length, rem = '0', quotent = '';
    let dvnd = dividend.substring(0, dl);
    dividend = dividend.substring(dl);

    precission = precission+2;//-pt_loc;

    while(prec<=precission){
        //console.log(dvnd+', '+dividend);
        let qt = 0;
        while(parseInt(dvnd)>=parseInt(divisor)){
            dvnd = add(dvnd, '-'+divisor);
            //console.log(dvnd);
            qt++;
        }
        quotent += qt;
        //console.log('---'+qt);
        
        if(!dividend){
            if(!prec)
                quotent+='.';
            prec++;
            dvnd = dvnd+'0';
        }else{
            if(dividend[0]=='.'){
                quotent+='.';
                prec++;
                dividend = dividend.substring(1);
            }
            dvnd = dvnd + dividend.substring(0,1);
            dividend = dividend.substring(1);
        }
    }
    //console.log(quotent);
    /*if(pt_loc>=0){
        let new_loc = (quotent.indexOf('.')?quotent.indexOf('.'):quotent.length)-pt_loc;
        quotent = quotent.replace('.', '');
        quotent = quotent.substring(0, new_loc)+'.'+quotent.substring(new_loc);
        precission = precission + pt_loc;
    }*/

    return roundOff(quotent, precission-2);
}