import requests
import datetime


def create_json_file() -> dict:
    r = requests.get('http://127.0.0.1:8000/test_mock')
    r_dictionary = r.json()
    return r_dictionary


def reminder_data() -> dict:
    """Filter out some important data needed for reminder part
    from parse part.
    The return dictionary should contain: key as company name, a list containing
    the lastest payment date and next payment date.
    Also need to change the type of date (originally string) to datetime object.
    """
    response = create_json_file()
    reminder_dict = {}

    for i in response:
        list = []
        company_name = response[i]["company"]
        lastest_payment_dt = datetime.datetime.strptime(response[i]["lastest_payment_dt"],
        '%Y-%m-%d').date()
        next_payment_dt = datetime.datetime.strptime(response[i]["next_payment_dt"],
        '%Y-%m-%d').date()
        list.append(lastest_payment_dt)
        list.append(next_payment_dt)
        reminder_dict[company_name] = list

        

    return reminder_dict


def check_next_date() -> dict:
    """Compare the current time with next_payment_dt, if it's less or equal to 3 days in advance of the 
    next_payment_dt, return a boolean value True, if not, return False.
    """
    reminder_dict = reminder_data()
    time_now = datetime.datetime.today().strftime("%Y-%m-%d")
    current_time = datetime.datetime.strptime(time_now, "%Y-%m-%d").date()
    xi = {}

    for company_name in reminder_dict:
        next_payment_dt = reminder_dict[company_name][1]
        d = datetime.timedelta(days=3)
        three_advance_dt = next_payment_dt - d
        if current_time >= three_advance_dt :
            xi[company_name] = True
        else:
            xi[company_name] = False
    
    return xi


if __name__ == '__main__':
    check_next_date